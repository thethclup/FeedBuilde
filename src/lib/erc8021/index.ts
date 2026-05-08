export const ATTRIBUTION_CODE = "[ATTRIBUTION_CODE]";
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
