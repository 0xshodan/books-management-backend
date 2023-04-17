var Book = Backbone.Model.extend({
  id: "id",
  name: "name",
  author: "author",
});

var BookView = Backbone.View.extend({
  model: new Book(),
  tagName: "tr",
  initialize: function () {
    this.template = _.template(
      "<tr>" +
        "<% _.each(book, function(value)" +
        "{ %><td> <%- value %> </td> <%});" +
        "%>" +
        "</tr>"
    );
  },
  render: function () {
    this.$el.html(this.template({ book: this.model.attributes }));
    return this;
  },
});

var BookList = Backbone.Collection.extend({
  model: Book,
  url: "/api/v1/book/",
  parse: function (response) {
    return response.objects.map(function (book) {
      delete book.resource_uri;
      return book;
    });
  },
});

let bookRowTemplate = _.template(
  "<% _.each(book, function(value)" + "{ %><td> <%- value %> </td> <%});" + "%>"
);
var books = new BookList();
var BookListView = Backbone.View.extend({
  el: "#maintable",
  bookTemplate: bookRowTemplate,
  model: books,
  initialize: function () {
    this.model.on("add", this.render, this);
    this.model.on(
      "change",
      function () {
        setTimeout(function () {
          self.render();
        }, 30);
      },
      this
    );
    this.model.on("remove", this.render, this);
    this.model.fetch();
  },
  render: function () {
    console.log(this.model);
    self = this;
    this.$el.html("");
    _.each(this.model.toArray(), function (book) {
      self.$el.append(new BookView({ model: book }).render().$el);
    });
    return this;
  },
});
var x = new BookListView();
