export interface ConsentArtifact {
  created: Date;
  expires: Date;
  id: string;
  revocable: boolean;
  collector: {
    id: string;
    url: string;
  };
  consumer: {
    id: string;
    url: string;
  };
  provider: {
    id: string;
    url: string;
  };
  user: {
    type: string | number;
    name: string;
    issuer: string;
    dpID: string;
    cmID: string;
    dcID: string;
  };
  revoker: {
    url: string;
    name: string;
    id: string;
  };
  purpose: string;
  user_sign: string;
  collector_sign: string;
  log: {
    consent_use: {
      url: string;
    };
    data_access: {
      url: string;
    };
  };
  data: string;
}