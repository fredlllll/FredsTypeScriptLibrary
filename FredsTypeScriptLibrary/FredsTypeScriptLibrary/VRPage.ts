interface VRPage {
    pageElement: HTMLElement;
    onEnable: (oldPage:VRPage, arg: any) => void;
    onDisable: (newPage: VRPage) => void;
    goBack: () => void;

    pageID: string;
}