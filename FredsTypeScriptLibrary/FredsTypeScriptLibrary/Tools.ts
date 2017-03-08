var baseConsole = window.console;
baseConsole.log.bind(baseConsole);
class Tools {
    static randomString(length: number): string {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    static getDataDir(): string {
        var dataDir = cordova.file.dataDirectory;
        if (device.platform == "Android") {//android
            dataDir = cordova.file.externalDataDirectory;
        } else if (device.platform == "iOS") {//ios
            dataDir = cordova.file.syncedDataDirectory;
        } else if (device.platform == "WinCE" || device.platform == "Win32NT") {//windows (windows does give different strings as platform)
            dataDir = cordova.file.syncedDataDirectory;
        }
        return dataDir;
    }

    static dataURLtoBlob(dataURL: string/*, callback: (blob: Blob) => void*/): Blob {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs
        var splitString = dataURL.split(',');
        var byteString = atob(splitString[1]);

        // separate out the mime component
        var mimeString = splitString[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }


        var b = new Blob([ab], { type: mimeString });
        return b;
        // write the ArrayBuffer to a blob, and you're done
        /*var bb = new MSBlobBuilder(); // or just BlobBuilder() if not using Chrome
        bb.append(ab);
        return bb.getBlob(mimeString);*/
    }

    static stdCompare(a: any, b: any) {
        if (a < b)
            return -1;
        else if (a > b)
            return 1;
        else
            return 0;
    }

    static extend(target: Object, data: Object) {
        for (var k in data) {
            if (target == null) {
                Tools.log("target is null! with data: ");
                Tools.log(data);
            } else {
                var descriptorProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(target), k); //get set properties
                var descriptorField = Object.getOwnPropertyDescriptor(target, k); //fields
                //Tools.log("descriptor for " + k + ": " + descriptor);
                //Tools.log("descriptor2 for " + k + ": " + descriptor2);
                if ((descriptorProperty && descriptorProperty.set) || (descriptorField && descriptorField.writable)) {
                    //Tools.log("extending " + k);
                    if (target[k] === null) { //cause typeof(null) is also object
                        target[k] = data[k];
                    } else if (typeof (target[k]) === "object") {
                        Tools.extend(target[k], data[k]);
                    } else if (typeof (target[k]) === "function") {
                        //ignore functions
                    } else if (typeof (target[k]) !== "undefined") {
                        target[k] = data[k];
                    }
                } else {
                    target[k] = data[k];
                }
            }
        }
        if (target && (<any>target).changed) {
            (<any>target).changed();
        }
    }

    static removeElement(elem: HTMLElement): void {
        if (elem.remove) {//remove from dom
            elem.remove();
        } else if ((<any>elem).removeNode) { //thx IE 8 or watever windows phone uses u fuckwit for not following conventions
            (<any>elem).removeNode(true);
        } else {
            throw "i cant remove the element because SOMEONE doesnt follow conventions";
        }
    }

    static log(msg: any) {
        baseConsole.log.call(baseConsole, msg);
    }
}