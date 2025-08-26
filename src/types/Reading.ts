export interface ReadingResponse {
  id: string;
  cycle: string;
  route: string;
  type: 'EVIDENCE' | 'CAUSAL';
  createdAt: string;

  meter: {
    serialNumber: string;
    property: {
      address: string;
      tenant: {
        fullName: string;
      };
    };
  };

  evidence: {
    value: number;
    photo?: string;
  } | null;

  causal: {
    causalId: string;
  } | null;
}
