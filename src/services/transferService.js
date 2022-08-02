import { httpService } from "./httpService";

export const transferService = {
  addTransfer,
  getTransfers,
  getTransfersByContactEmail,
};

async function addTransfer(contactId, transferAmount) {
  try {
    return await httpService.post(`transfer/`, { contactId, transferAmount });
  } catch (err) {
    throw err;
  }
}

async function getTransfers() {
  try {
    return await httpService.get(`transfer/`);
  } catch {}
}

async function getTransfersByContactEmail(contactEmail) {
  try {
    return await httpService.get(`transfer/${contactEmail}`);
  } catch {}
}
