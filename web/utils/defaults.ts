import {signature,newSignersList,newSignerDetails} from './types'

export const defaultSignature:signature={
    height: 60,
    onPages: [
        "1"
    ],
    position: "bottom-left",
    width: 180,
}
export const defaultNewSignerDetails:newSignerDetails={
    identifier: "",
    displayName: "",
    deadline: "",
    signature: defaultSignature
} 
export const defaultNewSignersList:newSignersList={
    signers:[defaultNewSignerDetails]
}