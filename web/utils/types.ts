export interface signerDetails {
    id: string;
    identifier: string;
    displayName: string;
    status: string;
    url: string;
    createdAt: string;
    updatedAt: string;
}
export interface signRequest {
    documentId: string;
    id: string;
    name: string;
    redirectUrl: string;
    signers: signerDetails[];
    status: string;
    createdAt: string;
    updatedAt: string;
}
export interface signature {
    height: number;
    onPages: Array<string>;
    position: string;
    width: number;
}
export interface newSignerDetails {
    identifier: string;
    displayName: string;
    deadline: string;
    signature: signature;
}
export interface newSignersList {
    signers: Array<newSignerDetails>
}
export interface Notification {
    show: boolean;
    message: string;
    kind: "success"|"error"|"info"|"warning"|undefined;
}
export interface signerAndDocData extends signerDetails {
    documentId: string;
    documentName: string;
    s3Url: string;
}