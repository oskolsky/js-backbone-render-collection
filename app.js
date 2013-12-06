$(function() {

  var Lists = Backbone.Collection.extend({
    url: function() {
      return '/data/rabbits.json'
    }
  });

  var ListView = Backbone.View.extend({
    tagName: 'li', className: 'rabbits_i',

    render: function() {
      this.$el.html(_.template($('#rabbits-item').html())(this.model.toJSON()));
      return this;
    }
  });

  var ListsView = Backbone.View.extend({
    el: '#rabbits',

    initialize: function() {
      this.collection = new Lists();
      var _this = this;
      this.collection.fetch({cache: false}).then(function() {
        _this.render();
      });
    },
    
    render: function() {
      this.collection.each(this.addOne, this);
      return this;
    },
    
    addOne: function(model) {
      var view = new ListView({model: model});
      var item = view.render().el;
      this.$el.append(item);
    }
  });

  new ListsView();

});