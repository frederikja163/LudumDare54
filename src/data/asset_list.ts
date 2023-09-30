import P5 from "p5";

export class AssetList{
    public image: P5.Image;
    public readonly imagePath: string = getPath("test.png");

    public readonly testPath: string = getPath("test.png");
}

function getPath(path: string){
    return `./assets/${path}`;
}