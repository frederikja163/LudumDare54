import P5 from "p5";

export class AssetList{
    public readonly dirt: P5.Image[] = [];
    public readonly dirtPaths: string[] = [getPath("dirt/dirt1.png"), getPath("dirt/dirt2.png"), getPath("dirt/dirt3.png"), getPath("dirt/dirt4.png")];

    public readonly testPath: string = getPath("test.png");
}

function getPath(path: string){
    return `./assets/${path}`;
}