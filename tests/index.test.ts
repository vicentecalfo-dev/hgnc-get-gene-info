import { HGNC } from "../dist";

const SECONDS = 1000;
jest.setTimeout(90 * SECONDS);

const hgnc = new HGNC();

const searchableFieldsData = hgnc.searchableFields;
const storedFieldsData = hgnc.storedFields;

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const sortedArr1 = [...arr1].sort();
  const sortedArr2 = [...arr2].sort();
  return sortedArr1.every((value, index) => value === sortedArr2[index]);
}

test("Get INFO - [searchableFields]", async () => {
  const { searchableFields } = await hgnc.fetchInfo();
  const test = arraysAreEqual(searchableFieldsData, searchableFields);
  expect(test).toBe(true);
});

test("Get INFO - [storedFields]", async () => {
  const { storedFields } = await hgnc.fetchInfo();
  const test = arraysAreEqual(storedFieldsData, storedFields);
  expect(test).toBe(true);
});

test("Fetch by symbol = ZNF3", async () => {
  const resource = "symbol";
  const query = "ZNF3";
  const { response } = await hgnc.fetchBy(resource, query);
  expect(response.docs[0][resource]).toBe(query);
});

test("Fetch by locus_type ='gene with protein product'", async () => {
  const resource = "locus_type";
  const query = "gene with protein product";
  const data = await hgnc.fetchBy(resource, query);
  expect(data.response.docs[0][resource]).toBe(query);
});

test("Fetch by ensembl_gene_id = ENSG00000166526", async () => {
  const resource = "ensembl_gene_id";
  const query = "ENSG00000166526";
  const { response } = await hgnc.fetchBy(resource, query);
  expect(response.docs[0][resource]).toBe(query);
});

test("Searching by all fields = BRAF", async () => {
  const query = "BRAF";
  const { response } = await hgnc.searchByAllFields(query);
  expect(response.docs.length).toBe(5);
});

test("Searching by symbol = ZNF*", async () => {
  const resource = "symbol";
  const query = "ZNF*";
  const { response } = await hgnc.searchBy(resource, query);
  expect(response.docs.length).toBe(764);
});

test("Searching by symbol = :ZNF*+NOT+status:Approved", async () => {
  const resource = "symbol";
  const query = ":ZNF*+NOT+status:Approved";
  const { response } = await hgnc.searchBy(resource, query);
  expect(response.docs.length).toBe(67);
});

test("DB Overview - GENE", async () => {
  const documentType = "gene";
  const {response}  = await hgnc.dbOverview(documentType);
  expect(response.hasOwnProperty("num_found")).toBe(true);
});
