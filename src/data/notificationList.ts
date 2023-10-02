import { Notification } from "../gui/notification";
import { TutorialStep } from "./gamedata";

export class NotificationList{
    public readonly cannotRemoveQueen = new Notification("Action failed", "Couldn't remove tile og change chambertype, it would kill your only queen.");
    public readonly noTilesLeft = new Notification("Excavation failed", "Not enough workers to maintain this many tiles.");
    
    public readonly missingResidential = new Notification("Ant production failed", "Not enough chambers to produce ant.");
    public readonly missingFood = new Notification("Ant production failed", "Not enough food to produce ant.");
    public readonly antProductionFailed = new Notification("Ant production failed", "Unknown reason");

    // public readonly welcomeMessage = new Notification("", "");
    public readonly excavateTunnel = new Notification(`Tutorial ${TutorialStep.ExcavateTunnel}/${TutorialStep.Finished}`, "Excavate a tunnel using the shovel");
    public readonly createChamber = new Notification(`Tutorial ${TutorialStep.CreateChamber}/${TutorialStep.Finished}`, "Good job! Now excavate a chamber. A chamber is a space that is atleast 2x2.");
    public readonly markAsResidential = new Notification(`Tutorial ${TutorialStep.MarkAsResidential}/${TutorialStep.Finished}`, "Residential chambers allow you to house more ants. Your amount of ants can be seen in the top of your screen. Mark the space as a residential chamber, using the bed icon.");
    public readonly excavateAnotherChamber = new Notification(`Tutorial ${TutorialStep.ExcavateAnotherChamber}/${TutorialStep.Finished}`, "Now excavate another empty chamber. You can resize chambers later to upgrade their effects.");
    public readonly markAsFarm = new Notification(`Tutorial ${TutorialStep.MarkAsFarm}/${TutorialStep.Finished}`, "You need farms and farmer ants to produce food. Food is needed for ants, and each type of ant consumes a different amount of food.");
    // TODO: Write steps for going into the spawn menu and unpausing the game.
    public readonly finished = new Notification(`Tutorial ${TutorialStep.Finished}/${TutorialStep.Finished}`, "Congratulations, you are all done now. You got the pheromones from here.");
}