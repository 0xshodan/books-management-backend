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
      '<div><%- profile.column_name %></div><input class="switch-btn" type="checkbox" checked=<%- profile.is_visible %>></input>'
    );
  },
  render: function () {
    this.$el.html(this.template({ profile: this.model.attributes }));
    this.$el.attr("scope", "row");
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
      if (profile.is_visible) {
        delete profile.resource_uri;
        return profile;
      }
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
    console.log(this.model.toArray());
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
  author: "author",
});

var BookView = Backbone.View.extend({
  model: new Book(),
  tagName: "tr",
  initialize: function () {
    this.template = _.template(
      "<% _.each(book, function(value){ %><td> <%- value %> </td> <%});%>"
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
      delete book.resource_uri;
      return book;
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

var booksView = new BookListView();
var profilesView = new ProfileListView();
