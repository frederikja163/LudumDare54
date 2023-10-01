import P5 from "p5";

export class AssetList {
    public readonly dirt: P5.Image[] = [];
    public readonly dirtPaths: string[] = [getPath("dirt/dirt1.png"), getPath("dirt/dirt2.png"), getPath("dirt/dirt3.png"), getPath("dirt/dirt4.png")];

    public readonly foodIconPath: string = getPath("gui/resources/food_icon.png");
    public readonly queenPath: string = getPath("gui/resources/queen_icon.png");
    public readonly farmerPath: string = getPath("gui/resources/farmer_icon.png");
    public readonly workerPath: string = getPath("gui/resources/worker_icon.png");
    public readonly soldierPath: string = getPath("gui/resources/soldier_icon.png");

    public readonly digIconPath: string = getPath("gui/build_buttons/dig_icon.png");
    public readonly digIconActivePath: string = getPath("gui/build_buttons/dig_icon_active.png");
    public readonly fillIconPath: string = getPath("gui/build_buttons/fill_icon.png");
    public readonly fillIconActivePath: string = getPath("gui/build_buttons/fill_icon_active.png");
    public readonly trainingIconPath: string = getPath("gui/build_buttons/training_icon.png");
    public readonly trainingIconActivePath: string = getPath("gui/build_buttons/training_icon_active.png");
    public readonly farmingIconPath: string = getPath("gui/build_buttons/farming_icon.png");
    public readonly farmingIconActivePath: string = getPath("gui/build_buttons/farming_icon_active.png");
    public readonly residentialIconPath: string = getPath("gui/build_buttons/residential_icon.png");
    public readonly residentialIconActivePath: string = getPath("gui/build_buttons/residential_icon_active.png");
    public readonly queenIconPath: string = getPath("gui/build_buttons/queen_icon.png");
    public readonly queenIconActivePath: string = getPath("gui/build_buttons/queen_icon_active.png");

    public readonly testPath: string = getPath("test.png");
    public readonly testAltPath: string = getPath("test_alt.png");
}

function getPath(path: string) {
    return `./assets/${path}`;
}