import MGMECore from "./logic/mgme-core";
import MGMECore2e from "./logic/mgme-core-2e";
import MGME2ePanel from "./app/panel-mythic-gme-2e";
import PUMV8Core from "./logic/pum-v8-core";
import PUMV8Panel from "./app/panel-pum-v8";
import SUMV7Core from "./logic/sum-v7-core";
import SUMV7Panel from "./app/panel-sum-v7";
import GUMV2Core from "./logic/gum-v2-core";
import GUM2Panel from "./app/panel-gum-v2";
import GMAPanel from "./app/panel-gma";
import MGMECards from "./logic/mgme-cards";
import MGMEChatExtras from "./logic/mgme-chat-extras";
import MGMEOracleBuilder from "./logic/mgme-oracle-builder";

export default class MGMEMacroAPI {

  static mgmeRenderPanel(key, is_secondary=false) {
    let startWidth = 420;
    let startTop = 320;
    let startHeight = undefined;
    let resizable = false;
    let win;
    switch (key) {
      case 'mgme_2e': {
        win = new MGME2ePanel(is_secondary);
        startTop = 375;
        startHeight = 300;
        resizable = true;
        break;
      }
      case 'gma_cards': {
        win = new GMAPanel(is_secondary);
        resizable = true;
        startHeight = 250;
        break;
      }
      case 'pum8_core': {
        win = new PUMV8Panel(is_secondary);
        startTop = 325;
        startHeight = 250;
        startWidth = 500;
        resizable = true;
        break;
      }
      case 'sum7_core': {
        win = new SUMV7Panel(is_secondary);
        startTop = 325;
        startHeight = 250;
        startWidth = 470;
        resizable = true;
        break;
      }
      case 'gum2_core': {
        win = new GUM2Panel(is_secondary);
        startTop = 325;
        startHeight = 250;
        startWidth = 470;
        resizable = true;
        break;
      }
    }
    if (is_secondary)
      startTop += 320;
    win?.render(true, {
      width: startWidth,
      left: (canvas.app.screen.width - startWidth - 400),
      top: canvas.app.screen.height - startTop - 80,
      height: startHeight,
      resizable: resizable
    });
    return win;
  }

  static mgmeLaunchPanel() {
    if (game.settings.get('mythic-gme-tools', 'panelPermission') === 'onlygm' && !game.user.isGM) {
      return
    }
    const key = game.settings.get('mythic-gme-tools', 'panelKey');
    const api = game.modules.get('mythic-gme-tools').api;
    if (api.win) {
      api.win?.close({force: true});
      delete api.win;
    }
    if (key === 'nopanel') return;
    const win = MGMEMacroAPI.mgmeRenderPanel(key);
    api.win = win;
  }

  static mgmeResetRuleDefaults(panelKey) {
    switch (panelKey) {
      case 'mgme_2e': {
        MGMECore.resetDefaults2e();
        break;
      }
      case 'pum8_core': {
        break;
      }
      case 'sum7_core': {
        break;
      }
      case 'gum2_core': {
        break;
      }
    }
  }

  static mgmeIncreaseChaos = MGMECore.mgmeIncreaseChaos;
  static mgmeDecreaseChaos = MGMECore.mgmeDecreaseChaos;
  static mgmeCheckChaos = MGMECore.mgmeCheckChaos;
  static mgmeFateChart = MGMECore.mgmeFateChart;
  static mgmeRandomEvent = MGMECore.mgmeRandomEvent;
  static mgmeFocusCheck = MGMECore.mgmeFocusCheck;
  static mgmeSceneAlteration = MGMECore.mgmeSceneAlteration;

  static mgmeDealCard = MGMECards.mgmeDealCard;

  static mgmeExportChatToJournal = MGMEChatExtras.mgmeExportChatToJournal;
  static mgmeFormattedChat = MGMEChatExtras.mgmeFormattedChat;
  static mgmeExternalRollTable = MGMEChatExtras.mgmeExternalRollTable;
  static mgmeFlavoredRollTable = MGMEChatExtras.mgmeFlavoredRollTable;

  static mgmeOracleBuilder = MGMEOracleBuilder.mgmeOracleBuilder;
  static mgmePrepareCustomOracleQuestion = MGMEOracleBuilder.mgmePrepareCustomOracleQuestion;

  static mgmeRenderNPCsList = MGMEChatExtras.mgmeRenderNPCsList;
  static mgmeRollNPCsList = MGMEChatExtras.mgmeRollNPCsList;
  static mgmeRenderThreadsList = MGMEChatExtras.mgmeRenderThreadsList;
  static mgmeRollThreadsList = MGMEChatExtras.mgmeRollThreadsList;

  static mgmeRenderNPCsList2e = MGMECore2e.mgmeRenderNPCsList2e;
  static mgmeRollNPCsList2e = MGMECore2e.mgmeRollNPCsList2e;
  static mgmeRenderThreadsList2e = MGMECore2e.mgmeRenderThreadsList2e;
  static mgmeRollThreadsList2e = MGMECore2e.mgmeRollThreadsList2e;

  static mgmeActions = MGMECore2e.mgmeActions;
  static mgmeDescriptions = MGMECore2e.mgmeDescriptions;
  static mgmeSceneAdjust = MGMECore2e.mgmeSceneAdjust;

  static mgmeAdvTone = MGMECore2e.mgmeAdvTone;
  static mgmeAlienSpecies = MGMECore2e.mgmeAlienSpecies;
  static mgmeAnimalActions = MGMECore2e.mgmeAnimalActions;
  static mgmeArmyDescriptors = MGMECore2e.mgmeArmyDescriptors;
  static mgmeCaverns = MGMECore2e.mgmeCaverns;
  static mgmeCharacters = MGMECore2e.mgmeCharacters;
  static mgmeCharacterCombat = MGMECore2e.mgmeCharacterCombat;
  static mgmeCharacterActions = MGMECore2e.mgmeCharacterActions;
  static mgmeCharacterAppearance = MGMECore2e.mgmeCharacterAppearance;
  static mgmeCharacterBackground = MGMECore2e.mgmeCharacterBackground;
  static mgmeCharacterConversation = MGMECore2e.mgmeCharacterConversation;
  static mgmeCharacterDescriptors = MGMECore2e.mgmeCharacterDescriptors;
  static mgmeCharacterIdentity = MGMECore2e.mgmeCharacterIdentity;
  static mgmeCharacterMotivations = MGMECore2e.mgmeCharacterMotivations;
  static mgmeCharacterPersonality = MGMECore2e.mgmeCharacterPersonality;
  static mgmeCharacterSkills = MGMECore2e.mgmeCharacterSkills;
  static mgmeCharacterTraits = MGMECore2e.mgmeCharacterTraits;
  static mgmeCityDescriptors = MGMECore2e.mgmeCityDescriptors;
  static mgmeCivilizationDescriptors = MGMECore2e.mgmeCivilizationDescriptors;
  static mgmeCreatureAbilities = MGMECore2e.mgmeCreatureAbilities;
  static mgmeCreatureDescriptors = MGMECore2e.mgmeCreatureDescriptors;
  static mgmeCrypticMessage = MGMECore2e.mgmeCrypticMessage;
  static mgmeCurses = MGMECore2e.mgmeCurses;
  static mgmeDomicile = MGMECore2e.mgmeDomicile;
  static mgmeDungeonDescriptors = MGMECore2e.mgmeDungeonDescriptors;
  static mgmeDungeonTraps = MGMECore2e.mgmeDungeonTraps;
  static mgmeForestDescriptors = MGMECore2e.mgmeForestDescriptors;
  static mgmeGods = MGMECore2e.mgmeGods;
  static mgmeLegends = MGMECore2e.mgmeLegends;
  static mgmeLocations = MGMECore2e.mgmeLocations;
  static mgmeMagicItem = MGMECore2e.mgmeMagicItem;
  static mgmeMutationDescriptors = MGMECore2e.mgmeMutationDescriptors;
  static mgmeNames = MGMECore2e.mgmeNames;
  static mgmeNobleHouse = MGMECore2e.mgmeNobleHouse;
  static mgmeObjects = MGMECore2e.mgmeObjects;
  static mgmePlotTwists = MGMECore2e.mgmePlotTwists;
  static mgmePowers = MGMECore2e.mgmePowers;
  static mgmeScavengingResults = MGMECore2e.mgmeScavengingResults;
  static mgmeSmells = MGMECore2e.mgmeSmells;
  static mgmeSounds = MGMECore2e.mgmeSounds;
  static mgmeSpellEffects = MGMECore2e.mgmeSpellEffects;
  static mgmeStarshipDescriptors = MGMECore2e.mgmeStarshipDescriptors;
  static mgmeTerrainDescriptors = MGMECore2e.mgmeTerrainDescriptors;
  static mgmeUndeadDescriptors = MGMECore2e.mgmeUndeadDescriptors;
  static mgmeVisions = MGMECore2e.mgmeVisions;

  static pumV8RandomPrompt = PUMV8Core.pumV8RandomPrompt;
  static pumV8ModifiedProposal = PUMV8Core.pumV8ModifiedProposal;
  static pumV8Challenge = PUMV8Core.pumV8Challenge;
  static pumV8Catalyst = PUMV8Core.pumV8Catalyst;
  static pumV8Complication = PUMV8Core.pumV8Complication;
  static pumV8Situation = PUMV8Core.pumV8Situation;

  static pumV8Subjective = (formula) => PUMV8Core.pumV8Subjective(formula);
  static pumV8Deterministic = (formula) => PUMV8Core.pumV8Deterministic(formula);
  static pumV8Interaction = (formula) => PUMV8Core.pumV8Interaction(formula);

  static pumV8Disruption = PUMV8Core.pumV8Disruption;

  static pumV8Someone = PUMV8Core.pumV8Someone;
  static pumV8Intent = PUMV8Core.pumV8Intent;
  static pumV8Activity = PUMV8Core.pumV8Activity;
  static pumV8Place = PUMV8Core.pumV8Place;
  static pumV8Reason = PUMV8Core.pumV8Reason;
  static pumV8Explain = PUMV8Core.pumV8Explain;

  static pumV8Focus = PUMV8Core.pumV8Focus;

  static pumV8HowMany = (formula) => PUMV8Core.pumV8HowMany(formula);
  static pumV8HowWell = (formula) => PUMV8Core.pumV8HowWell(formula);
  static pumV8HowHard = (formula) => PUMV8Core.pumV8HowHard(formula);

  static pumV8Time = PUMV8Core.pumV8Time;
  static pumV8Object = PUMV8Core.pumV8Object;
  static pumV8Fight = PUMV8Core.pumV8Fight;
  static pumV8Sense = PUMV8Core.pumV8Sense;
  static pumV8Discovery = PUMV8Core.pumV8Discovery;
  static pumV8Stakes = PUMV8Core.pumV8Stakes;

  static pumV8Description = PUMV8Core.pumV8Description;

  static pumV8RenderAspectsList = PUMV8Core.pumV8RenderAspectsList;
  static pumV8RenderEncountersList = PUMV8Core.pumV8RenderEncountersList;
  static pumV8RenderFindsList = PUMV8Core.pumV8RenderFindsList;
  static pumV8RenderQuestionsList = PUMV8Core.pumV8RenderQuestionsList;

  static pumV8RollAspectsList = PUMV8Core.pumV8RollAspectsList;
  static pumV8RollEncountersList = PUMV8Core.pumV8RollEncountersList;
  static pumV8RollFindsList = PUMV8Core.pumV8RollFindsList;
  static pumV8RollQuestionsList = PUMV8Core.pumV8RollQuestionsList;

  static gmaDraw = (deck) => MGMECards.mgmeDealCard({tableName: deck});

  // SUM V7

  static sumV7ActionsReaction = (formula) => SUMV7Core.sumV7ActionsReaction(formula);
  static sumV7FirstReaction = (formula) => SUMV7Core.sumV7FirstReaction(formula);
  static sumV7BondingRelations = (formula) => SUMV7Core.sumV7BondingRelations(formula);
  static sumV7PlotContribution = (formula) => SUMV7Core.sumV7PlotContribution(formula);
  static sumV7FillerTalks = (formula) => SUMV7Core.sumV7FillerTalks(formula);
  static sumV7PersonalityType = (formula) => SUMV7Core.sumV7PersonalityType(formula);
  static sumV7InterventionCheck = (formula) => SUMV7Core.sumV7InterventionCheck(formula);
  static sumV7LingeringBackstories = (formula) => SUMV7Core.sumV7LingeringBackstories(formula);
  static sumV7SceneOpener = (formula) => SUMV7Core.sumV7SceneOpener(formula);
  static sumV7OpinionResponse = (formula) => SUMV7Core.sumV7OpinionResponse(formula);
  static sumV7OutsideImpression = (formula) => SUMV7Core.sumV7OutsideImpression(formula);
  static sumV7ParallelMatters = (formula) => SUMV7Core.sumV7ParallelMatters(formula);
  static sumV7JobProfession = (formula) => SUMV7Core.sumV7JobProfession(formula);
  static sumV7RecentAnecdote = (formula) => SUMV7Core.sumV7RecentAnecdote(formula);
  static sumV7TruthOrDare = (formula) => SUMV7Core.sumV7TruthOrDare(formula);

  // GUM V2

  static gum2Question = (threshold) => GUMV2Core.gum2Question(threshold);

  static gum2Intervention = GUMV2Core.gum2Intervention;

  static gum2Action = GUMV2Core.gum2Action;
  static gum2Adjective = GUMV2Core.gum2Adjective;
  static gum2Subject = GUMV2Core.gum2Subject;

  static gum2ExpLocation = GUMV2Core.gum2ExpLocation;
  static gum2ExpSkill = GUMV2Core.gum2ExpSkill;
  static gum2ExpCircumstance = GUMV2Core.gum2ExpCircumstance;

  static gum2CombLocation = GUMV2Core.gum2CombLocation;
  static gum2CombTactics = GUMV2Core.gum2CombTactics;
  static gum2CombComposition = GUMV2Core.gum2CombComposition;

  static gum2PlotClue = GUMV2Core.gum2PlotClue;
  static gum2PlotFinding = GUMV2Core.gum2PlotFinding;
  static gum2PlotActivities = GUMV2Core.gum2PlotActivities;
  static gum2PlotOccurrences = GUMV2Core.gum2PlotOccurrences;

  static gum2NPCGAttitude = GUMV2Core.gum2NPCGAttitude;
  static gum2NPCGContribution = GUMV2Core.gum2NPCGContribution;
  static gum2NPCGOpinion = GUMV2Core.gum2NPCGOpinion;
  static gum2NPCGWants = GUMV2Core.gum2NPCGWants;

  static gum2NPCEAttitude = GUMV2Core.gum2NPCEAttitude;
  static gum2NPCEImpression = GUMV2Core.gum2NPCEImpression;
  static gum2NPCEDeeds = GUMV2Core.gum2NPCEDeeds;
  static gum2NPCEIntentions = GUMV2Core.gum2NPCEIntentions;

  static gum2MotGoodMotive = GUMV2Core.gum2MotGoodMotive;
  static gum2MotGoodActions = GUMV2Core.gum2MotGoodActions;
  static gum2MotEvilMotive = GUMV2Core.gum2MotEvilMotive;
  static gum2MotEvilActions = GUMV2Core.gum2MotEvilActions;

  static gum2CharPossess = GUMV2Core.gum2CharPossess;
  static gum2CharLooks = GUMV2Core.gum2CharLooks;
  static gum2CharActivity = GUMV2Core.gum2CharActivity;
  static gum2CharIntention = GUMV2Core.gum2CharIntention;

  static gum2CreatureType = GUMV2Core.gum2CreatureType;
  static gum2CreatureAbility = GUMV2Core.gum2CreatureAbility;
  static gum2CreatureBehavior = GUMV2Core.gum2CreatureBehavior;

  static gum2LocFeature = GUMV2Core.gum2LocFeature;
  static gum2LocWorth = GUMV2Core.gum2LocWorth;
  static gum2LocPurpose = GUMV2Core.gum2LocPurpose;
  static gum2LocContent = GUMV2Core.gum2LocContent;

  static gum2ObjFunction = GUMV2Core.gum2ObjFunction;
  static gum2ObjForm = GUMV2Core.gum2ObjForm;
  static gum2ObjState = GUMV2Core.gum2ObjState;

  static gum2FactionFocus = GUMV2Core.gum2FactionFocus
  static gum2FactionResource = GUMV2Core.gum2FactionResource;

  static gum2PromptScene = GUMV2Core.gum2PromptScene;
  static gum2PromptWorld = GUMV2Core.gum2PromptWorld;

}