import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'ons-page[partner]',
    templateUrl: './partner-tab.component.html',
    styleUrls: ['./partner-tab.component.scss'],
})
export class PartnerTabComponent {
    uploading!: boolean;
    @ViewChild('input') input!: ElementRef;
    @ViewChild('container') container!: ElementRef;

    inputClick() {
        this.input?.nativeElement?.click();
    }

    upload(): Promise<void> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<void>(async resolve => {
            const filePicker: HTMLInputElement = this.input.nativeElement;

            if (!filePicker) {
                this.uploading = false;
                resolve();
                return;
            }

            if (filePicker.files && filePicker.files.length > 0) {
                this.uploading = true;
                const myFile = filePicker.files[0];

                const myBase64File = await this.convert(myFile);
                // console.log(`Your base64 image is ${myBase64File}`);
                // TO DO upload to server;

                this.appendImageToGallery(myBase64File);
                this.uploading = false;
            }

            resolve();
        });
    }

    appendImageToGallery(myBase64File: string | ArrayBuffer) {
        const image = document.createElement('img');
        image.setAttribute('src', myBase64File as string);
        image.setAttribute('class', 'image');
        this.container.nativeElement.appendChild(image);
    }

    private convert(myFile: File): Promise<string | ArrayBuffer> {
        return new Promise<string | ArrayBuffer>((resolve, reject) => {
            const fileReader = new FileReader();
            if (fileReader && myFile) {
                fileReader.readAsDataURL(myFile);
                fileReader.onload = () => {
                    resolve(fileReader.result as string | ArrayBuffer);
                };

                fileReader.onerror = error => {
                    reject(error);
                };
            } else {
                reject('No file provided');
            }
        });
    }
}
