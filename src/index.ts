interface HGNCOptions {
  rootURL?: string;
  frontRootURL?: string;
  output?: "XML" | "JSON";
}

class HGNC {
  private rootURL: string;
  private frontRootURL: string;
  private output: "XML" | "JSON";
  private contentType = {
    XML: "text/xml",
    JSON: "application/json",
  };
  constructor({
    rootURL = "https://rest.genenames.org",
    frontRootURL = "https://www.genenames.org",
    output = "JSON",
  }: HGNCOptions = {}) {
    this.rootURL = rootURL;
    this.frontRootURL = frontRootURL;
    this.output = output;
  }

  private responseByContentType(response: Response) {
    return this.output === "JSON" ? response.json() : response.text();
  }

  private customFetch(resource: string) {
    return fetch(`${this.rootURL}/${resource}`, {
      method: "GET",
      headers: {
        Accept: this.contentType[this.output],
      },
    });
  }

  get storedFields() {
    return [
      "cd",
      "iuphar",
      "pseudogene.org",
      "status",
      "lncrnadb",
      "horde_id",
      "mirbase",
      "prev_name",
      "prev_symbol",
      "gene_group",
      "uniprot_ids",
      "date_modified",
      "location",
      "gtrnadb",
      "merops",
      "symbol_report_tag",
      "ena",
      "rgd_id",
      "alias_name",
      "refseq_accession",
      "homeodb",
      "mane_select",
      "location",
      "bioparadigms_slc",
      "orphanet",
      "snornabase",
      "cosmic",
      "rna_central_id",
      "alias_symbol",
      "imgt",
      "gene_group_id",
      "vega_id",
      "ucsc_id",
      "lsdb",
      "ensembl_gene_id",
      "date_symbol_changed",
      "date_name_changed",
      "date_approved_reserved",
      "locus_type",
      "symbol",
      "pubmed_id",
      "alias_name",
      "omim_id",
      "enzyme_id",
      "_version_",
      "name",
      "mamit-trnadb",
      "lncipedia",
      "mgd_id",
      "curator_notes",
      "gencc",
      "ccds_id",
      "agr",
      "uuid",
      "hgnc_id",
      "prev_name",
      "entrez_id",
      "locus_group",
    ];
  }

  get searchableFields() {
    return [
      "symbol",
      "rna_central_id",
      "alias_name",
      "curator_notes",
      "rgd_id",
      "locus_type",
      "alias_symbol",
      "ucsc_id",
      "ensembl_gene_id",
      "ccds_id",
      "locus_group",
      "ena",
      "mgd_id",
      "name",
      "refseq_accession",
      "hgnc_id",
      "entrez_id",
      "prev_symbol",
      "omim_id",
      "symbol_report_tag",
      "status",
      "vega_id",
      "mane_select",
      "uniprot_ids",
      "prev_name",
      "location",
    ];
  }

  async fetchInfo() {
    try {
      const response = await this.customFetch("info");
      return await this.responseByContentType(response);
    } catch (error) {
      return error;
    }
  }

  async fetchBy(storedField: string, query: any) {
    const fieldNotExists = !this.storedFields.includes(storedField);
    if (fieldNotExists)
      throw new Error(
        "The provided resource is not valid. Please verify the options for storedFields."
      );
    try {
      const resource = `fetch/${storedField}/${encodeURIComponent(query)}`;
      const response = await this.customFetch(resource);
      return await this.responseByContentType(response);
    } catch (error) {
      return error;
    }
  }

  async searchByAllFields(query: any) {
    try {
      const resource = `search/${encodeURIComponent(query)}`;
      const response = await this.customFetch(resource);
      return await this.responseByContentType(response);
    } catch (error) {
      return error;
    }
  }

  async searchBy(searchableField: string, query: any) {
    const fieldNotExists = !this.searchableFields.includes(searchableField);
    const hasAdvancedQuery = query[0] === ":";
    if (fieldNotExists)
      throw new Error(
        "The provided resource is not valid. Please verify the options for searchableFields."
      );
    try {
      const resource = `search/${searchableField}${
        hasAdvancedQuery ? "" : "/"
      }${encodeURIComponent(query)}`;
      const response = await this.customFetch(resource);
      return await this.responseByContentType(response);
    } catch (error) {
      return error;
    }
  }

  async dbOverview(documentType = "gene") {
    const resource = `cgi-bin/search/search?query=&start=0&filter=document_type:${documentType}`;
    try {
      const response = await fetch(`${this.frontRootURL}/${resource}`, {
        method: "GET",
      });
      const output:any = await response.json();
      delete output.documents;
      return {
        response: output
      }
    } catch (error) {
      return error;
    }
  }
}

export { HGNC };
