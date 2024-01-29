class AppFeactures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const search = this.queryString.keyward;
    const searchRegex = new RegExp(search, "i");
    this.query = this.query.find({ name: searchRegex });
    return this;
  }

  filter() {
    let filterQuery = { ...this.queryString };
    let excludeObj = ["page", "limit", "keyward", "sort", "field"];

    excludeObj.forEach((el) => {
      delete filterQuery[el];
    });

    filterQuery = JSON.stringify(filterQuery).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(filterQuery));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortQuery = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortQuery);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  field() {
    if (this.queryString.field) {
      const fieldQuery = this.queryString.field.split(",").join(" ");
      this.query = this.query.select(fieldQuery);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  pagination() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = AppFeactures;
