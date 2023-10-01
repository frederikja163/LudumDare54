import P5 from "p5";

export class AssetList {
    public readonly dirt: P5.Image[] = [];
    public readonly dirtPaths: string[] = [getPath("dirt/dirt1.png"), getPath("dirt/dirt2.png"), getPath("dirt/dirt3.png"), getPath("dirt/dirt4.png")];
    public readonly foodIconPath: string = "./assets/gui/food_icon.png";
    public readonly digIconPath: string = "./assets/gui/dig_icon.png";
    public readonly fillIconPath: string = "./assets/gui/fill_icon.png";

    public readonly testPath: string = getPath("test.png");
}

function getPath(path: string) {
    return `./assets/${path}`;
}