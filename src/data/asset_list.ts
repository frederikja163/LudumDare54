import P5 from "p5";

export class AssetList{
    public readonly dirt: P5.Image[] = [];
    public readonly dirtPaths: string[] = [getPath("dirt/dirt1.png")];

    public readonly testPath: string = getPath("test.png");
}

function getPath(path: string){
    return `./assets/${path}`;
}