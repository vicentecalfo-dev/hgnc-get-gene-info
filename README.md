# HGNC Gene Info Wrapper

This package is designed to facilitate interactions with the Human Gene Nomenclature Committee (HGNC) API. It enables the retrieval of genetic information using specific methods based on stored or searchable fields

### Properties

- `rootURL?: string`: Base URL for API requests to HGNC. Default value is 'https://rest.genenames.org'.
- `output?: "XML" | "JSON"`: Desired output format for the API responses. Possible values are 'XML' or 'JSON', with 'JSON' being the default.

### Methods

- `fetchInfo()`: Returns general information available from the API.
- `fetchBy(storedField: string, query: any)`: Fetches information from the API based on a specific field and a query. Throws an error if the specified field is not in the `storedFields` list.
- `searchByAllFields(query: any)`: Conducts a search on all searchable fields with the specified query.
- `searchBy(searchableField: string, query: any)`: Conducts a search on a specific field with the specified query. Throws an error if the specified field is not in the `searchableFields` list.

### Accessible Properties

- `storedFields`: Returns a list of fields that can be specified for the `fetchBy` method.
- `searchableFields`: Returns a list of fields that can be specified for the `searchBy` method.

## Usage Examples

### Creating an Instance of the Class

```javascript
const hgnc = new HGNC();
```

### Fetching General Information

The information request (https://rest.genenames.org/info) is utilized to obtain details about the service itself rather than to retrieve data from the server. The response from this request will provide information such as the last update time of the server data (lastModified), the total number of documents (numDoc), which fields are searchable through search and fetch methods (searchableFields), and which fields can be returned by the fetch operation (storedFields).

```javascript
async () => {
  const info = await hgnc.fetchInfo();
};
```

### Fetching by a Specific Field

The fetch request is the primary method used to obtain specific records from the server, which will include all fields listed in the "storedFields" section of the info response. The fetch operation requires the user to specify a queryable field (as detailed in the "searchableFields" section of the info) along with the search term in the URL.

The definition list below shows all the fields that could possibly be returned within a fetch request:

| Field                 | Type           | Description                                                                                                  | Example URL                                                             |
|-----------------------|----------------|--------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| **agr**               | string         | The Alliance of Genomic Resources HGNC ID for the Human gene page within the resource.                       | `https://www.alliancegenome.org/gene/<AGR HGNC ID>`                     |
| **alias_name**        | string array   | See alias_name within the searchable fields for the definition.                                              |                                                                         |
| **alias_symbol**      | string array   | See alias_symbol within the searchable fields for the definition.                                            |                                                                         |
| **bioparadigms_slc**  | string         | Symbol used to link to the SLC tables database at bioparadigms.org for the gene.                             | `http://slc.bioparadigms.org/protein?GeneName=<SYMBOL>`                 |
| **ccds_id**           | string array   | See ccds_id within the searchable fields for the definition.                                                 | `https://www.ncbi.nlm.nih.gov/CCDS/CcdsBrowse.cgi?REQUEST=CCDS&DATA=<CCDS ID>` |
| **cd**                | string         | Symbol used within the Human Cell Differentiation Molecule database for the gene.                            | `http://www.hcdm.org/index.php?option=com_molecule&cdnumber=<SYMBOL>`   |
| **cosmic**            | string         | Symbol used within the Catalogue of somatic mutations in cancer for the gene.                                | `http://cancer.sanger.ac.uk/cosmic/gene/overview?ln=<SYMBOL>`           |
| **curator_notes**     | string array   | See curator_notes within the searchable fields for the definition.                                           |                                                                         |
| **date_approved_reserved** | date        | The date the entry was first approved.                                                                    |                                                                         |
| **date_modified**     | date           | Date the entry was last modified.                                                                           |                                                                         |
| **date_name_changed** | date           | The date the gene name was last changed.                                                                    |                                                                         |
| **date_symbol_changed** | date         | The date the gene symbol was last changed.                                                                |                                                                         |
| **ena**               | string array   | See ena within the searchable fields for the definition.                                                    | `https://www.ebi.ac.uk/ena/data/view/<ENA ACCESSION>`                   |
| **ensembl_gene_id**   | string         | See ensembl_gene_id within the searchable fields for the definition.                                        | `https://www.ensembl.org/Homo_sapiens/Gene/Summary?g=<ENSEMBL GENE ID>` |
| **entrez_id**         | string         | See entrez_id within the searchable fields for the definition.                                               | `https://www.ncbi.nlm.nih.gov/gene/<ID>`                                 |
| **enzyme_id**         | string array   | ENZYME EC accession number.                                                                                 | `http://enzyme.expasy.org/EC/<EC ACCESSION NUMBER>`                     |
| **gencc**             | string array   | HGNC ID associated to a Gene Curation Coalition (GenCC) record.                                             | `https://search.thegencc.org/genes/<HGNC ID>`                            |
| **gene_group**        | string         | HGNC gene group names to which the gene belongs.                                                            |                                                                         |
| **gene_group_id**     | int array      | HGNC gene group ID to which the gene belongs.                                                               | `/data/genegroup/#!/group/<ID>`                                          |
| **gtrnadb**           | string         | The GtRNAdb ID to which the gene belongs. This will only appear if the gene is a tRNA.                       | `http://gtrnadb.ucsc.edu/genomes/eukaryota/Hsapi38/genes/<gtrnadb>.html`|
| **hgnc_id**           | string         | See hgnc_id within the searchable fields for the definition.                                                | `/data/gene-symbol-report/#!/hgnc_id/<HGNC ID>`                          |
| **homeodb**           | int            | Homeobox Database ID.                                                                                       | `http://homeodb.cbi.pku.edu.cn/gene_info.get?id=<ID>`                    |
| **horde_id**          | string         | Symbol used within HORDE for the gene.                                                                      | `http://genome.weizmann.ac.il/horde/card/index/symbol:<SYMBOL>`         |
| **imgt**              | string         | Symbol used within international ImMunoGeneTics information system.                                         | `http://www.imgt.org/IMGT_GENE-DB/GENElect?query=2+<SYMBOL>&species=Homo+sapiens` |
| **intermediate_filament_db** | string | ID used to link to the Human Intermediate Filament Database.                                             | `http://www.interfil.org/details.php?id=<ID>`                            |
| **iuphar**            | string         | The objectId used to link to the IUPHAR/BPS Guide to PHARMACOLOGY database.                                  | `http://www.guidetopharmacology.org/GRAC/ObjectDisplayForward?objectId=<ID>` |
| **lncipedia**         | string         | The LNCipedia ID to which the gene belongs. This will only appear if the gene is a long non-coding RNA.      | `https://lncipedia.org/db/gene/<lncipedia>`                              |
| **lncrnadb**          | string         | lncRNA Database ID.                                                                                          | `http://www.lncrnadb.org/<ID>`                                           |
| **location**          | string         | Cytogenetic location of the gene (e.g., 2q34).                                                               |                                                                         |
| **locus_group**       | string         | See locus_group within the searchable fields for the definition.                                             |                                                                         |
| **locus_type**        | string         | See locus_type within the searchable fields for the definition.                                              |                                                                         |
| **lsdb**              | string array   | The name of the Locus Specific Mutation Database and URL for the gene separated by a \| character.           | `eg Mutations of the ATP-binding Cassette Transporter Retina\|http://www.retina-international.org/files/sci-news/abcrmut.htm` |
| **mamit-trnadb**      | int            | ID to link to the Mamit-tRNA database.                                                                       | `http://mamit-trna.u-strasbg.fr/mutations.asp?idAA=<ID>`                |
| **mane_select**       | string array   | See mane_select within the searchable fields for the definition.                                             |                                                                         |
| **merops**            | string         | ID used to link to the MEROPS peptidase database.                                                            | `https://www.ebi.ac.uk/merops/cgi-bin/pepsum?id=<ID>`                    |
| **mgd_id**            | string array   | See mgd_id within the searchable fields for the definition.                                                  | `http://www.informatics.jax.org/marker/<MGD ID>`                         |
| **mirbase**           | string         | miRBase ID.                                                                                                  | `http://www.mirbase.org/cgi-bin/mirna_entry.pl?acc=<ID>`                |
| **name**              | string         | See name within the searchable fields for the definition.                                                    |                                                                         |
| **omim_id**           | int array      | Online Mendelian Inheritance in Man (OMIM) ID.                                                              | `http://www.omim.org/entry/<ID>`                                        |
| **orphanet**          | int            | Orphanet ID.                                                                                                 | `http://www.orpha.net/consor/cgi-bin/OC_Exp.php?Lng=GB&Expert=<ID>`     |
| **prev_name**         | string array   | See prev_name within the searchable fields for the definition.                                               |                                                                         |
| **prev_symbol**       | string array   | See prev_symbol within the searchable fields for the definition.                                              |                                                                         |
| **pseudogene.org**    | string         | Pseudogene.org ID.                                                                                           | `http://tables.pseudogene.org/<ID>`                                     |
| **pubmed_id**         | long array     | Pubmed and Europe Pubmed Central PMIDs.                                                                      | `https://www.ncbi.nlm.nih.gov/pubmed/<PMID> and https://europepmc.org/search/?page=1&query=<PMID>` |
| **refseq_accession**  | string array   | See refseq_accession within the searchable fields for the definition.                                        | `https://www.ncbi.nlm.nih.gov/nuccore/<REFSEQ ACCESSION>`                |
| **rgd_id**            | string array   | See rgd_id within the searchable fields for the definition. To use the ID to link to RGD remove "RGD:" from the ID. | `http://rgd.mcw.edu/rgdweb/report/gene/main.html?id=<RGD ID>`           |
| **rna_central_id**    | string array   | See rna_central_id within the searchable fields for the definition.                                          | `https://rnacentral.org/rna/<RNACentral ID>/9606`                        |
| **snornabase**        | string         | snoRNABase ID.                                                                                               | `https://www-snorna.biotoul.fr//plus.php?snoid=<ID>`                    |
| **status**            | string         | See status within the searchable fields for the definition.                                                  |                                                                         |
| **symbol**            | string         | See symbol within the searchable fields for the definition.                                                  |                                                                         |
| **symbol_report_tag** | string         | See symbol_report_tag within the searchable fields for the definition.                                       |                                                                         |
| **ucsc_id**           | string         | See ucsc_id within the searchable fields for the definition.                                                 |                                                                         |
| **uniprot_ids**       | string array   | See uniprot_ids within the searchable fields for the definition.                                             | `http://www.uniprot.org/uniprot/<UNIPROT ID>`                            |
| **uuid**              | string         | Unique ID held within the search server.                                                                     |                                                                         |
| **vega_id**           | string         | See vega_id within the searchable fields for the definition.                                                 | `http://vega.sanger.ac.uk/Homo_sapiens/Gene/Sequence?db=core;g=<VEGA GENE ID>` |


```javascript
async () => {
  const resource = "ensembl_gene_id";
  const query = "ENSG00000166526";
  const data = await hgnc.fetchBy(resource, query);
};
```
### Search

The search request is more powerful than the fetch for querying the database, but the search only returns the fields hgnc_id, symbol, and score. If you want to retrieve all the data for a set of genes from the search results, the user could use the hgnc_id returned by the search to then initiate a request for the hgnc_id using fetch.

Below is a definition list containing the fields that can be used to fetch and search records found within the HGNC record.

| Field             | Description                                                                                                               | Example URL                                                                                              |
|-------------------|---------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| **alias_name**    | Other names used to refer to this gene as seen in the "Alias names" field in the gene symbol report.                      | `https://rest.genenames.org/search/alias_name/%22A-kinase%20anchor%20protein,%20350kDa%22`               |
| **alias_symbol**  | Other symbols used to refer to this gene as seen in the "Alias symbols" field in the gene symbol report.                   | `https://rest.genenames.org/search/alias_symbol/BRAF1`                                                   |
| **ccds_id**       | Consensus CDS ID. This field may be found within the "Nucleotide resources" section of the gene symbol report.             | `https://rest.genenames.org/search/ccds_id/CCDS5863`                                                     |
| **curator_notes** | This field contains additional information related to the entry that has been manually added by an HGNC curator.           | `https://rest.genenames.org/search/curator_notes/functional`                                             |
| **ena**           | International Nucleotide Sequence Database Collaboration (GenBank, ENA, and DDBJ) accession number(s).                     | `https://rest.genenames.org/search/ena/M95712`                                                           |
| **ensembl_gene_id** | Ensembl gene ID. Found within the "Gene resources" section of the gene symbol report.                                   | `https://rest.genenames.org/search/ensembl_gene_id/ENSG00000157764`                                       |
| **entrez_id**     | Entrez gene ID. Found within the "Gene resources" section of the gene symbol report.                                      | `https://rest.genenames.org/search/entrez_id/673`                                                        |
| **hgnc_id**       | HGNC ID. A unique ID created by the HGNC for every approved symbol.                                                       | `https://rest.genenames.org/search/hgnc_id/1097`                                                         |
| **location**      | The chromosomal location. For details on searching specific chromosomes or chromosome arms, please use wildcards.         | `https://rest.genenames.org/search/location/01*`                                                         |
| **locus_group**   | A group name for a set of related locus types as defined by the HGNC.                                                     | `https://rest.genenames.org/search/locus_group/%22non-coding%20RNA%22`                                    |
| **locus_type**    | The locus type as defined by the HGNC.                                                                                    | `https://rest.genenames.org/search/locus_type/%22RNA,%20long%20non-coding%22`                            |
| **mane_select**   | MANE Select nucleotide accession with version.                                                                            | `https://rest.genenames.org/search/locus_type/%22RNA,%20long%20non-coding%22`                            |
| **mgd_id**        | Mouse genome informatics database ID. Found within the "Homologs" section of the gene symbol report.                      | `https://rest.genenames.org/search/mgd_id/%22MGI:88190%22`                                               |
| **name**          | HGNC approved name for the gene. Equates to the "Approved name" field within the gene symbol report.                       | `https://rest.genenames.org/search/name/%22zinc%20finger%20protein%20536%22`                             |
| **omim_id**       | An Online Mendelian Inheritance in Man (OMIM) ID.                                                                         | `https://rest.genenames.org/search/omim_id/194510`                                                       |
| **prev_name**     | Gene names previously approved by the HGNC for this gene. Equates to the "Previous names" field within the gene symbol report. | `https://rest.genenames.org/search/prev_name/%22solute%20carrier%20family%205%20(choline%20transporter),%20member%207%22` |
| **prev_symbol**   | Symbols previously approved by the HGNC for this gene. Equates to the "Previous symbols" field within the gene symbol report. | `https://rest.genenames.org/search/prev_symbol/RN5S49`                                                   |
| **refseq_accession** | RefSeq nucleotide accession. Found within the "Nucleotide resources" section of the gene symbol report.                | `https://rest.genenames.org/search/refseq_accession/NM_033360`                                            |
| **rgd_id**        | Rat genome database gene ID. Found within the "Homologs" section of the gene symbol report.                                | `https://rest.genenames.org/search/rgd_id/%22RGD:2981%22`                                                |
| **rna_central_id** | An RNAcentral ID. Found within the "Nucleotide resources" section of the gene symbol report.                             | `https://rest.genenames.org/search/rna_central_id/URS000075AC83`                                         |
| **status**        | Status of the symbol report, which can be either "Approved" or "Entry Withdrawn".                                          | `https://rest.genenames.org/search/status/Approved`                                                      |
| **symbol**        | The HGNC approved gene symbol. Equates to the "Approved symbol" field within the gene symbol report.                       | `https://rest.genenames.org/search/symbol/KLF4`                                                          |
| **symbol_report_tag** | The tag that may appear next to the title of the symbol report. Tags include "Ambiguous" for ambiguous locus type genes, "Placeholder symbol", and "Stable symbol". | `https://rest.genenames.org/search/symbol_report_tag/Ambiguous`                                          |
| **ucsc_id**       | UCSC gene ID. Found within the "Gene resources" section of the gene symbol report.                                         | `https://rest.genenames.org/search/ucsc_id/%22uc001rgp%22`                                               |
| **uniprot_ids**   | UniProt protein accession. Found within the "Protein resources" section of the gene symbol report.                         | `https://rest.genenames.org/search/uniprot_ids/P00568`                                                   |
| **vega_id**       | Vega gene ID. Found within the "Gene resources" section of the gene symbol report.                                         | `https://rest.genenames.org/search/vega_id/OTTHUMG00000020722`                                           |


#### Searching by All Fields


#### Searching by a Specific Field

---

This document covers the basic functionalities of the HGNC class for interacting with the HGNC API, making it easier to retrieve genetic data efficiently and in a structured manner.

For more detailed documentation, access the link: [HGNC REST API Help](https://www.genenames.org/help/rest/).
