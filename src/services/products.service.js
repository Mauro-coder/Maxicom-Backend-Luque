import productsManager from "../data/mongo/products.mongo.js";

const createProductService = async (data) => await productsManager.create(data);

const readProductsService = async (filter) => await productsManager.readAll(filter);

const readOneProductService = async (pid) => await productsManager.readById(pid);

const updateProductService = async (pid, data) => await productsManager.updateById(pid, data);

const deleteProductService = async (pid) => await productsManager.destroyById(pid);

const paginateService = async (page, limit) => await productsManager.paginate(page, limit);

const pidParamService = async (pid) => await productsManager.pidParam(pid);

export { createProductService, readProductsService, readOneProductService, updateProductService, deleteProductService, paginateService, pidParamService };
