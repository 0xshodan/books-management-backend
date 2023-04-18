var Profile = Backbone.Model.extend({
  id: "id",
  column_name: "column_name",
  is_visible: "is_visible",
});
var ProfileView = Backbone.View.extend({
  model: new Profile(),
  tagName: "th",
  events: {
    "change .switch-btn": "switchActive",
  },
  initialize: function () {
    this.template = _.template(
      "<% if ( profile.column_name === '#' ) { %> <div> <%- profile.column_name %> </div> <% }" +
        "else { %> <div><%- profile.column_name %></div>" +
        '<input class="switch-btn" type="checkbox"></input> ' +
        "<% }" +
        "%>"
    );
  },
  render: function () {
    this.$el.html(this.template({ profile: this.model.attributes }));
    this.$el.attr("scope", "row");
    if (this.model.attributes.is_visible) {
      this.$(".switch-btn").attr("checked", true);
    }
    return this;
  },
  switchActive: function () {
    this.model.attributes.is_visible = !this.model.get("is_visible");
    this.model.save(
      { is_visible: this.model.get("is_visible") },
      { patch: true }
    );
  },
});
var ProfileList = Backbone.Collection.extend({
  model: Profile,
  url: "/api/v1/profiles/",
  parse: function (response) {
    resp = response.objects.map(function (profile) {
      delete profile.resource_uri;
      return profile;
    });
    resp.unshift({
      id: 0,
      column_name: "#",
      is_visible: true,
    });
    return resp;
  },
});

var profiles = new ProfileList();
var ProfileListView = Backbone.View.extend({
  el: "#table-head",
  model: profiles,
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
    self = this;
    this.$el.html("");
    _.each(this.model.toArray(), function (profile) {
      self.$el.append(new ProfileView({ model: profile }).render().$el);
    });
    return this;
  },
});

var Book = Backbone.Model.extend({
  id: "id",
  name: "name",
  title: "title",
  author: "author",
  description: "description",
  price: "price",
});

var BookView = Backbone.View.extend({
  model: new Book(),
  tagName: "tr",
  initialize: function () {
    this.template = _.template(
      "<% _.each(book, function(value, index){ " +
        'if (value !== null && index !== 1) {%><td><input value="<%- value %>"/></td> <%}' +
        "else{%><td></td> <%}" +
        "});%>"
    );
  },
  render: function () {
    this.$el.html(this.template({ book: this.model.attributes }));
    return this;
  },
});

var BookList = Backbone.Collection.extend({
  model: Book,
  url: "/api/v1/books/",
  parse: function (response) {
    return response.objects.map(function (book) {
      // Это нужно для выравнивания всех параметров
      delete book.resource_uri;
      let ret = {};
      ret.id = book.id;
      ret.name = book.name;
      ret.title = book.title;
      ret.author = book.author;
      ret.description = book.description;
      ret.price = book.price;
      return ret;
    });
  },
});

var books = new BookList();
var BookListView = Backbone.View.extend({
  el: "#table-body",
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
    this.model.on(
      "addnew",
      function () {
        let id =
          this.model.models.length !== 0
            ? this.model.models.slice(-1)[0].attributes.id + 1
            : 1;
        this.model.models.push(
          new Book({
            id: id,
            name: "Новая книга",
            title: "",
            author: "Не указан",
            description: "",
            price: 0,
          })
        );
        this.model.models.slice(-1)[0].save();
        this.render();
      },
      this
    );
    this.model.on(
      "delete",
      function (id) {
        let elem = _.find(this.model.models, function (book) {
          return book.id == id;
        });
        if (typeof elem === undefined) {
          alert("Неверно указан id");
        } else {
          let index = this.model.models.indexOf(elem);
          this.model.models.splice(index, 1);
          this.render();
        }
      },
      this
    );
    this.model.on("remove", this.render, this);

    this.model.fetch();
  },
  render: function () {
    self = this;
    this.$el.html("");
    _.each(this.model.toArray(), function (book) {
      self.$el.append(new BookView({ model: book }).render().$el);
    });
    return this;
  },
});

var booksView = new BookListView();
var profilesView = new ProfileListView();

function addBook() {
  booksView.model.trigger("addnew");
}
function deleteBook() {
  let id = prompt("Введите id удаляемой книги: ");
  booksView.model.trigger("delete", id);
}
