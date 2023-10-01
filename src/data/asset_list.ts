import P5 from "p5";

export class AssetList {
    public readonly dirt: P5.Image[] = [];
    public readonly dirtPaths: string[] = [getPath("dirt/dirt1.png"), getPath("dirt/dirt2.png"), getPath("dirt/dirt3.png"), getPath("dirt/dirt4.png")];

    public readonly foodIconPath: string = getPath("gui/food_icon.png");
    public readonly queenPath: string = getPath("gui/queen_icon.png");
    public readonly farmerPath: string = getPath("gui/farmer_icon.png");
    public readonly workerPath: string = getPath("gui/worker_icon.png");
    public readonly soldierPath: string = getPath("gui/soldier_icon.png");

    public readonly digIconPath: string = getPath("gui/dig_icon.png");
    public readonly digIconActivePath: string = getPath("gui/dig_icon_active.png");
    public readonly fillIconPath: string = getPath("gui/fill_icon.png");
    public readonly fillIconActivePath: string = getPath("gui/fill_icon_active.png");
    public readonly trainingIconPath: string = getPath("gui/training_icon.png");
    public readonly trainingIconActivePath: string = getPath("gui/training_icon_active.png");
    public readonly farmingIconPath: string = getPath("gui/farming_icon.png");
    public readonly farmingIconActivePath: string = getPath("gui/farming_icon_active.png");
    public readonly residentialIconPath: string = getPath("gui/residential_icon.png");
    public readonly residentialIconActivePath: string = getPath("gui/residential_icon_active.png");

    public readonly testPath: string = getPath("test.png");
}

function getPath(path: string) {
    return `./assets/${path}`;
}