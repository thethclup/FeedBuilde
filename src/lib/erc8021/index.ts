export const ATTRIBUTION_CODE = "0x0762635f6b64663038376e700080218021802180218021802180218021";
export const BUILDER_CODE = "bc_kdf087np";

export interface AttributedTransaction {
  type: 'post' | 'upgrade' | 'prestige' | 'gm';
  data: any;
  attribution: string;
  builderId: string;
}

export function constructERC8021Tx(type: string, data: any): AttributedTransaction {
  return {
    type: type as any,
    data,
    attribution: ATTRIBUTION_CODE,
    builderId: BUILDER_CODE
  };
}
