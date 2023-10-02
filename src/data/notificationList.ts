import { Notification } from "../gui/notification";

export class NotificationList{
    public readonly cannotRemoveQueen = new Notification("Action failed", "Couldn't remove tile og change chambertype, it would kill your only queen.");
    public readonly noTilesLeft = new Notification("Excavation failed", "Not enough workers to maintain this many tiles.");
    
    public readonly missingResidential = new Notification("Ant production failed", "Not enough chambers to produce ant.");
    public readonly missingFood = new Notification("Ant production failed", "Not enough food to produce ant.");
    public readonly antProductionFailed = new Notification("Ant production failed", "Unknown reason");
}