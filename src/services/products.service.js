import {
  createProductRep,
  readProductsRep,
  readOneProductRep,
  updateProductRep,
  deleteProductRep,
  paginateRep,
  pidParamRep,
} from "../repositories/products.rep.js";

const createProductService = async (data) => {await createProductRep(data);};
const readProductsService = async (filter) => await readProductsRep(filter);
const readOneProductService = async (pid) => await readOneProductRep(pid);
const updateProductService = async (pid, data) => await updateProductRep(pid, data);
const deleteProductService = async (pid) => await deleteProductRep(pid);
const paginateService = async (page, limit) => await paginateRep(page, limit);
const pidParamService = async (pid) => await pidParamRep(pid);

export {
  createProductService,
  readProductsService,
  readOneProductService,
  updateProductService,
  deleteProductService,
  paginateService,
  pidParamService,
};
