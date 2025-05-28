import MGMEChatJournal from "../utils/mgme-chat-journal";
import MGMECommon from "../utils/mgme-common";

export default class MGMEChatExtras {

  static async mgmeExportChatToJournal() {
    const defaultJournalName = `${game.i18n.localize('MGME.MythicAdventureLog')}`;
    const exportDialog = await renderTemplate('./modules/mythic-gme-tools/template/extras-exportchat-dialog.hbs', {defaultJournalName: defaultJournalName});
    let dialogue = new Dialog({
      title: game.i18n.localize('MGME.ExportAllToJournal'),
      content: exportDialog,
        render: html => {
          const lastConfig = game.user.getFlag('mythic-gme-tools', 'mgmeLastExportConfig');
          if (lastConfig) {
            html.find("#mgme_export_highlight_flavor").prop('checked', lastConfig.highlightFlavor);
            html.find("#mgme_export_actor_img").prop('checked', lastConfig.actorImg);
            html.find("#mgme_export_include_meta").prop('checked', lastConfig.includeMeta);
            html.find("#mgme_export_clear_chat").prop('checked', lastConfig.clearChat);
          }
          html[0].getElementsByTagName("input").mgme_export_journal_name.focus()
        },
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: game.i18n.localize('MGME.Export'),
          callback: (html) => {
            const journalName = html.find("#mgme_export_journal_name").val()?.trim();
            const includeTimestamp = html.find("#mgme_export_include_meta").prop('checked');
            const includeActorImg = html.find("#mgme_export_actor_img").prop('checked');
            const highlightFlavor = html.find("#mgme_export_highlight_flavor").prop('checked');
            const clearChat = html.find("#mgme_export_clear_chat").prop('checked');
            let entries = [];
            ui.chat.collection.contents.forEach(chat => {
              entries.push(MGMEChatJournal._mgmeBuildLogChatHtml(chat, includeTimestamp, includeActorImg, highlightFlavor));
            });
            MGMEChatJournal._mgmeFindOrCreateJournal(journalName).then(targetJournal => {
              const lastPage = targetJournal.pages.contents[targetJournal.pages.contents.length-1];
              lastPage.update({text: {content: entries.join('\n')}}).then(() => {
                if (clearChat)
                  game.messages.flush();
                game.user.setFlag('mythic-gme-tools', 'mgmeLastExportConfig', {
                  'highlightFlavor': highlightFlavor,
                  'actorImg': includeActorImg,
                  'includeMeta': includeTimestamp,
                  'clearChat': clearChat
                });
              })
            })
          }
        }
      },
      default: "submit"
    })
    dialogue.render(true)
  }

  static async mgmeRenderNPCsList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('NPCs List', 'Mythic Lists').then(table => {
      table.sheet.render(true);
    });
  }

  static async mgmeRenderThreadsList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('Threads List', 'Mythic Lists').then(table => {
      table.sheet.render(true);
    });
  }

  static async mgmeRollNPCsList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('NPCs List', 'Mythic Lists').then(table => {
      table.normalize().then((t) => t.draw({rollMode: MGMECommon._mgmeGetRollMode()}));
    });
  }

  static async mgmeRollThreadsList() {
    MGMEChatJournal._mgmeFindOrCreateRolltable('Threads List', 'Mythic Lists').then(table => {
      table.normalize().then((t) => t.draw({rollMode: MGMECommon._mgmeGetRollMode()}));
    });
  }

  static async mgmeFormattedChat() {
    const tokens = game?.scenes?.active?.tokens?.contents || [];

    const formattedChatDialog = await renderTemplate('./modules/mythic-gme-tools/template/extras-formattedchat-dialog.hbs', {})

    let dialogue = new Dialog({
      title: game.i18n.localize('MGME.FormattedText'),
      content: formattedChatDialog,
      render: html => {
        const curSpeaker = ChatMessage.getSpeaker();
        const speakerElement = $("#mgme_format_speaker");
        speakerElement.append(`<option value="curr_user">${game.user.name}</option>`);
        tokens.forEach(token => {
          if (token.actor)
            speakerElement.append(`<option value=${token.actor.id} selected>${token.name}</option>`);
        });
        speakerElement.val(curSpeaker.actor ?? curSpeaker.alias);
        html[0].getElementsByTagName("input").mgme_format_text.focus()
      },
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: game.i18n.localize('MGME.ToChat'),
          callback: () => {
            let message;
            let color = $("#mgme_format_color").val()?.trim();
            if (color && color !== '') {
              color = `style="color:${color};"`;
            } else {
              `style="color:inherit;"`;
            }
            let text = $("#mgme_format_text").val()?.trim();
            if (!text || text === '') return;
            switch ($("#mgme_format_style").val()?.trim()) {
              case '':
              case 'normal':
              case undefined: {
                message = `<span ${color}>${text}</span>`;
                break;
              }
              case 'title': {
                message = `<h1 ${color}>${text}</h1>`;
                break;
              }
              case 'subtitle': {
                message = `<h2 ${color}>${text}</h2>`;
                break;
              }
              case 'bold': {
                message = `<b ${color}>${text}</b>`;
                break;
              }
              case 'italic': {
                message = `<em ${color}>${text}</em>`;
                break;
              }
              case 'underline': {
                message = `<u ${color}>${text}</u>`;
                break;
              }
            }

            const speakerElementVal = $("#mgme_format_speaker").val()?.trim();
            const selectedSpeaker = speakerElementVal === 'curr_user' ? {alias: game.user.name} : {actor: tokens.find(t => t.actor.id === speakerElementVal).actor.id};
            let chatConfig = {
              content: message,
              speaker: selectedSpeaker,
              whisper: MGMECommon._mgmeGetWhisperMode()
            };
            MGMEChatJournal._mgmeCreateChatAndLog(chatConfig);
          }
        }
      },
      default: "submit"
    })
    dialogue.render(true)
  }

  static async _mgmeExternallRollTableRoll(rolls, tableName) {
    if (!rolls?.length) return;
    const rollTotals = rolls.map(r => r.total);
    const outputRollDialog = await renderTemplate('./modules/mythic-gme-tools/template/extras-externalroll2-dialog.hbs', {rollTotals: rollTotals});

    const firstDialog = new Dialog({
      title: game.i18n.localize('MGME.ExternalRollTableOutcome'),
      content: outputRollDialog,
      render: html => {
        $("#mgme_ext_roll_table_name").val(tableName);
        html[0].getElementsByTagName("input").mgme_ext_roll_outcome.focus();
      },
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: game.i18n.localize('MGME.ToChat'),
          callback: () => {
            const debug = game.settings.get('mythic-gme-tools', 'mythicRollDebug');
            const textFlavor = $("#mgme_ext_roll_flavor").val()?.trim();
            const textOutcome = $("#mgme_ext_roll_outcome").val()?.trim();
            const whisper = MGMECommon._mgmeGetWhisperMode();
            if (textOutcome.length)
              MGMEChatJournal._mgmeCreateChatAndLog({
                flavor: tableName.length ? tableName : game.i18n.localize('MGME.ExternalTableCheck'),
                content: `${textFlavor.length ? `<h2>${textFlavor}</h2>` : ''}${textOutcome}${debug ? ` (${rolls[0].formula} = ${rollTotals})` : ''}`,
                whisper: whisper
              });
          }
        }
      },
      default: "submit"
    })
    firstDialog.render(true)
  }

  static async mgmeExternalRollTable() {
    const externalRollDialog = await renderTemplate('./modules/mythic-gme-tools/template/extras-externalroll1-dialog.hbs', {});

    const firstDialog = new Dialog({
      title: game.i18n.localize('MGME.ExternalRollTable'),
      content: externalRollDialog,
      render: html => {
        html[0].getElementsByTagName("input").mgme_ext_table_name.focus();
      },
      buttons: {
        submit: {
          icon: '<i class="fas fa-dice"></i>',
          label: 'Roll',
          callback: async () => {
            const tableName = $("#mgme_ext_table_name").val()?.trim();
            const formula = $("#mgme_ext_formula").val()?.trim();
            const howMany = parseInt($("#mgme_ext_many").val()?.trim());
            const rolls = [];
            let i = 0;
            while (i < howMany) {
              const roll = Roll.create(formula.length ? formula : '1d100');
              await roll.roll({async: true}).then(async r => {
                if (game.dice3d) {
                  await game.dice3d.showForRoll(r);
                }
                rolls.push(r);
              });
              i += 1;
            }
            MGMEChatExtras._mgmeExternallRollTableRoll(rolls, tableName);
          }
        }
      },
      default: "submit"
    })
    firstDialog.render(true)
  }

  static async mgmeFlavoredRollTable() {
    const rollDialog = await renderTemplate('./modules/mythic-gme-tools/template/extras-flavortable-dialog.hbs', {});
    const numEntries = 5;

    const firstDialog = new Dialog({
      title: game.i18n.localize('MGME.RollTableFlavorTitle'),
      content: rollDialog,
      render: html => {
        const tables = game.tables.contents.map(t => t.name);
        tables.sort()
        let i = 0;
        while (i < numEntries) {
          i += 1;
          tables.forEach(t => $("#mgme_table_select_" + i).append(`<option value="${t}">${t}</option>`));
        }
        html[0].getElementsByTagName("input").mgme_table_question.focus();
      },
      buttons: {
        submit: {
          icon: '<i class="fas fa-comments"></i>',
          label: game.i18n.localize('MGME.ToChat'),
          callback: async () => {
            const tableQuestion = $("#mgme_table_question").val()?.trim();
            let content = `${tableQuestion.length ? `<h2>${tableQuestion}</h2>` : ''}`;
            const debug = game.settings.get('mythic-gme-tools', 'mythicRollDebug');
            const whisper = MGMECommon._mgmeGetWhisperMode();
            let i = 0;
            while (i < numEntries) {
              i += 1;
              const selectedTable = $("#mgme_table_select_"+i).val()?.trim();
              const many = parseInt($("#mgme_table_many_"+i).val()?.trim());
              const formula = $("#mgme_table_formula_"+i).val()?.trim();
              const table = game.tables.contents.find(t => t.name === selectedTable);
              if (selectedTable?.length && table) {
                content += `<b>${selectedTable}</b>`;
                await table.drawMany(many, {roll: Roll.create(formula?.length ? formula : table.formula), displayChat: false}).then(draw => {
                  let ii = 0;
                  for (const result of draw.results) {
                    content += `<div>${result.description}${debug ? ` (${draw.roll.terms[0].results[ii].result})` : ''}</div>`
                    ii += 1;
                  }
                });
              }
            }
            MGMEChatJournal._mgmeCreateChatAndLog({
              whisper: whisper,
              flavor: game.i18n.localize('MGME.RollTableFlavorTitle'),
              content: content
            });
          }
        }
      },
      default: "submit"
    })
    firstDialog.render(true)
  }

}
