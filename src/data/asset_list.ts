import P5 from "p5";

export class Resource {
    public readonly foodIconPath: string = getPath("gui/resources/food_icon.png");
    public readonly tileIconPath: string = getPath("gui/resources/tile_icon.png");
    public readonly antPath: string = getPath("gui/resources/ant_icon.png");
    public readonly queenPath: string = getPath("gui/resources/queen_icon.png");
    public readonly farmerPath: string = getPath("gui/resources/farmer_icon.png");
    public readonly workerPath: string = getPath("gui/resources/worker_icon.png");
    public readonly soldierPath: string = getPath("gui/resources/soldier_icon.png");
}

export class SpawnMenu {
    public readonly playIconPath: string = getPath("gui/spawn_menu/play_icon.png");
    public readonly pauseIconPath: string = getPath("gui/spawn_menu/pause_icon.png");
    public readonly farmerPath: string = getPath("gui/spawn_menu/farmer_icon.png");
    public readonly farmerDisabledPath: string = getPath("gui/spawn_menu/farmer_icon_disabled.png");
    public readonly workerPath: string = getPath("gui/spawn_menu/worker_icon.png");
    public readonly workerDisabledPath: string = getPath("gui/spawn_menu/worker_icon_disabled.png");
    public readonly soldierPath: string = getPath("gui/spawn_menu/soldier_icon.png");
    public readonly soldierDisabledPath: string = getPath("gui/spawn_menu/soldier_icon_disabled.png");
}

export type Button = {
    readonly activePath: string,
    readonly iconPath: string,
}
export class BuildBtn {
    public readonly dig: Button = {
        iconPath: getPath("gui/build_buttons/dig_icon.png"),
        activePath: getPath("gui/build_buttons/dig_icon_active.png"),
    }
    public readonly fill: Button = {
        iconPath: getPath("gui/build_buttons/fill_icon.png"),
        activePath: getPath("gui/build_buttons/fill_icon_active.png"),
    }
    public readonly training: Button = {
        iconPath: getPath("gui/build_buttons/training_icon.png"),
        activePath: getPath("gui/build_buttons/training_icon_active.png"),
    }
    public readonly farming: Button = {
        iconPath: getPath("gui/build_buttons/farming_icon.png"),
        activePath: getPath("gui/build_buttons/farming_icon_active.png"),
    }
    public readonly residential: Button = {
        iconPath: getPath("gui/build_buttons/residential_icon.png"),
        activePath: getPath("gui/build_buttons/residential_icon_active.png"),
    }
    public readonly queen: Button = {
        iconPath: getPath("gui/build_buttons/queen_icon.png"),
        activePath: getPath("gui/build_buttons/queen_icon_active.png"),
    }
    public readonly spawn: Button = {
        iconPath: getPath("gui/build_buttons/spawn_icon.png"),
        activePath: getPath("gui/build_buttons/spawn_icon_active.png"),
    }
}

export type Tile = {
    readonly image: P5.Image[],
    readonly paths: string[],
}
export class Tiles {
    public readonly dirt: Tile = {
        image: [],
        paths: [getPath("tiles/dirt1.png"),
        getPath("tiles/dirt2.png"),
        getPath("tiles/dirt3.png"),
        getPath("tiles/dirt4.png"),]
    };
    public readonly colony: Tile = {
        image: [],
        paths: [getPath("tiles/colony.png")]
    };
}

export class AssetList {
    public readonly tiles: Tiles = new Tiles();
    public readonly resource: Resource = new Resource();
    public readonly spawnMenu: SpawnMenu = new SpawnMenu();
    public readonly buildBtn: BuildBtn = new BuildBtn();

    public readonly testPath: string = getPath("test.png");
    public readonly testAltPath: string = getPath("test_alt.png");
}

function getPath(path: string) {
    return `./assets/${path}`;
}