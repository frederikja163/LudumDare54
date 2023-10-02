import { Notification } from "../gui/notification";
import { TutorialStep } from "./gamedata";

export class NotificationList{
    public readonly cannotRemoveQueen = new Notification("Action failed", "Couldn't remove tile og change chambertype, it would kill your only queen.");
    public readonly noTilesLeft = new Notification("Excavation failed", "Not enough workers to maintain this many tiles.");
    
    public readonly missingResidential = new Notification("Ant production failed", "Not enough chambers to produce ant.");
    public readonly missingFood = new Notification("Ant production failed", "Not enough food to produce ant.");
    public readonly antProductionFailed = new Notification("Ant production failed", "Unknown reason");

    // public readonly welcomeMessage = new Notification("", "");
    public readonly moveCamera = new Notification(`Tutorial ${TutorialStep.MoveCamera}/${TutorialStep.Finished}`, "Start by moving the camera. This can be done using WASD/Arrow keys/the mouse.");
    public readonly zoomCamera = new Notification(`Tutorial ${TutorialStep.ZoomCamera}/${TutorialStep.Finished}`, "Next you should learn how to focus in on specific parts of the colony. Use the '+', '-' or the scroll wheel on your mouse to zoom in and out.");
    public readonly excavateTunnel = new Notification(`Tutorial ${TutorialStep.ExcavateTunnel}/${TutorialStep.Finished}`, "You can excavate tiles by using the shovel at the bottom of your screen. Pick a tile connected to the yello queen lair to excavate.");
    public readonly createChamber = new Notification(`Tutorial ${TutorialStep.CreateChamber}/${TutorialStep.Finished}`, "Good job! You just excavated a tunnel, you can also excavate chambers. A chamber is a space that is atleast 2x2. Try it out.");
    public readonly markAsResidential = new Notification(`Tutorial ${TutorialStep.MarkAsResidential}/${TutorialStep.Finished}`, "Chambers can have different types depending on your needs, for example a residential chambers allow you to house more ants.\nMark your new chamber as a residential chamber, using the bed icon.");
    public readonly excavateAnotherChamber = new Notification(`Tutorial ${TutorialStep.ExcavateAnotherChamber}/${TutorialStep.Finished}`, "You can resize chambers later to upgrade their effects.\nFirst you should excavate another empty chamber connected to the colony.");
    public readonly markAsFarm = new Notification(`Tutorial ${TutorialStep.MarkAsFarm}/${TutorialStep.Finished}`, "You need farms and farmer ants to produce food. Food is needed for ants, and each type of ant consumes a different amount of food.\nMark your new chamber as a farm.");
    // TODO: Write steps for going into the spawn menu and unpausing the game.
    public readonly finished = new Notification(`Tutorial ${TutorialStep.Finished}/${TutorialStep.Finished}`, "Congratulations, you are all done now. You got the pheromones from here.");
}