export const state = () => ({
    languages: [{
            text: "English",
            value: "en"
        },
        {
            text: "Русский",
            value: "ru"
        },
        {
            text: "Deutsch",
            value: "de"
        },
        {
            text: "Polskie",
            value: "pl"
        }
    ],
    default_language: "ru",
    themes: ["Dark", "Light"],
    news: [{
            date: new Date(+new Date() - Math.floor(Math.random() * 10000000000), ).toDateString(),
            heading: 'Long established first',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis tincidunt felis, ac venenatis tortor. Duis interdum auctor tellus sed mollis. In hac habitasse platea dictumst. Aliquam scelerisque justo ac tortor fringilla condimentum. Nunc a sem vel diam viverra venenatis a vitae est. Maecenas at leo at diam aliquet sagittis. Vestibulum congue ultricies placerat.
      
          Vivamus consequat, velit sit amet ullamcorper pellentesque, mi ante tempus sapien, vehicula fermentum tellus massa eu diam. Morbi ante magna, iaculis ut blandit eu, imperdiet vitae nunc. Vestibulum tristique felis in purus euismod venenatis. Etiam hendrerit lacus eget turpis varius rutrum at vel metus. Morbi tempus imperdiet tortor ut mattis. Ut sed est eleifend, tristique diam non, blandit mi. Proin lorem enim, sollicitudin eget ornare sed, hendrerit non sapien. Integer quam neque, tristique in consectetur vel, luctus at ex. Sed libero justo, pellentesque nec maximus id, aliquam et odio. Pellentesque ac consequat nunc. Vestibulum quis diam vestibulum, faucibus mauris id, elementum mauris. Nunc hendrerit augue sed dui porttitor, vel elementum ex finibus. Vivamus sed porttitor sapien. Ut suscipit, erat quis dapibus feugiat, urna augue ultricies massa, vel sodales metus mi vitae metus. Sed mattis nibh eget massa commodo lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          
          Vivamus eu metus tortor. Duis lacinia, elit eget pretium consectetur, erat odio malesuada tellus, eget commodo tellus lectus egestas magna. Vestibulum pulvinar risus a ipsum dignissim pellentesque. Praesent varius dolor ut neque eleifend sodales. Nulla in sodales leo. Phasellus consequat blandit metus feugiat luctus. Etiam rutrum, ligula non vulputate congue, sem orci aliquam dolor, at ultricies odio ipsum in massa. Donec at sodales est. Mauris iaculis urna in cursus aliquet.`,
            // img: first,
            articleId: '8730',
        },
        {
            date: new Date(+new Date() - Math.floor(Math.random() * 10000000000), ).toDateString(),
            heading: 'Long established',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis tincidunt felis, ac venenatis tortor. Duis interdum auctor tellus sed mollis. In hac habitasse platea dictumst. Aliquam scelerisque justo ac tortor fringilla condimentum. Nunc a sem vel diam viverra venenatis a vitae est. Maecenas at leo at diam aliquet sagittis. Vestibulum congue ultricies placerat.
      
          Vivamus consequat, velit sit amet ullamcorper pellentesque, mi ante tempus sapien, vehicula fermentum tellus massa eu diam. Morbi ante magna, iaculis ut blandit eu, imperdiet vitae nunc. Vestibulum tristique felis in purus euismod venenatis. Etiam hendrerit lacus eget turpis varius rutrum at vel metus. Morbi tempus imperdiet tortor ut mattis. Ut sed est eleifend, tristique diam non, blandit mi. Proin lorem enim, sollicitudin eget ornare sed, hendrerit non sapien. Integer quam neque, tristique in consectetur vel, luctus at ex. Sed libero justo, pellentesque nec maximus id, aliquam et odio. Pellentesque ac consequat nunc. Vestibulum quis diam vestibulum, faucibus mauris id, elementum mauris. Nunc hendrerit augue sed dui porttitor, vel elementum ex finibus. Vivamus sed porttitor sapien. Ut suscipit, erat quis dapibus feugiat, urna augue ultricies massa, vel sodales metus mi vitae metus. Sed mattis nibh eget massa commodo lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          
          Vivamus eu metus tortor. Duis lacinia, elit eget pretium consectetur, erat odio malesuada tellus, eget commodo tellus lectus egestas magna. Vestibulum pulvinar risus a ipsum dignissim pellentesque. Praesent varius dolor ut neque eleifend sodales. Nulla in sodales leo. Phasellus consequat blandit metus feugiat luctus. Etiam rutrum, ligula non vulputate congue, sem orci aliquam dolor, at ultricies odio ipsum in massa. Donec at sodales est. Mauris iaculis urna in cursus aliquet.`,
            // img: article_one_img,
            articleId: '23',
        },
        {
            date: new Date(+new Date() - Math.floor(Math.random() * 10000000000), ).toDateString(),
            heading: 'Long established',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis tincidunt felis, ac venenatis tortor. Duis interdum auctor tellus sed mollis. In hac habitasse platea dictumst. Aliquam scelerisque justo ac tortor fringilla condimentum. Nunc a sem vel diam viverra venenatis a vitae est. Maecenas at leo at diam aliquet sagittis. Vestibulum congue ultricies placerat.
      
          Vivamus consequat, velit sit amet ullamcorper pellentesque, mi ante tempus sapien, vehicula fermentum tellus massa eu diam. Morbi ante magna, iaculis ut blandit eu, imperdiet vitae nunc. Vestibulum tristique felis in purus euismod venenatis. Etiam hendrerit lacus eget turpis varius rutrum at vel metus. Morbi tempus imperdiet tortor ut mattis. Ut sed est eleifend, tristique diam non, blandit mi. Proin lorem enim, sollicitudin eget ornare sed, hendrerit non sapien. Integer quam neque, tristique in consectetur vel, luctus at ex. Sed libero justo, pellentesque nec maximus id, aliquam et odio. Pellentesque ac consequat nunc. Vestibulum quis diam vestibulum, faucibus mauris id, elementum mauris. Nunc hendrerit augue sed dui porttitor, vel elementum ex finibus. Vivamus sed porttitor sapien. Ut suscipit, erat quis dapibus feugiat, urna augue ultricies massa, vel sodales metus mi vitae metus. Sed mattis nibh eget massa commodo lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          
          Vivamus eu metus tortor. Duis lacinia, elit eget pretium consectetur, erat odio malesuada tellus, eget commodo tellus lectus egestas magna. Vestibulum pulvinar risus a ipsum dignissim pellentesque. Praesent varius dolor ut neque eleifend sodales. Nulla in sodales leo. Phasellus consequat blandit metus feugiat luctus. Etiam rutrum, ligula non vulputate congue, sem orci aliquam dolor, at ultricies odio ipsum in massa. Donec at sodales est. Mauris iaculis urna in cursus aliquet.`,
            // img: article_three_img,
            articleId: '12',
        },
        {
            date: new Date(+new Date() - Math.floor(Math.random() * 10000000000), ).toDateString(),
            heading: 'Long established',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis tincidunt felis, ac venenatis tortor. Duis interdum auctor tellus sed mollis. In hac habitasse platea dictumst. Aliquam scelerisque justo ac tortor fringilla condimentum. Nunc a sem vel diam viverra venenatis a vitae est. Maecenas at leo at diam aliquet sagittis. Vestibulum congue ultricies placerat.
      
          Vivamus consequat, velit sit amet ullamcorper pellentesque, mi ante tempus sapien, vehicula fermentum tellus massa eu diam. Morbi ante magna, iaculis ut blandit eu, imperdiet vitae nunc. Vestibulum tristique felis in purus euismod venenatis. Etiam hendrerit lacus eget turpis varius rutrum at vel metus. Morbi tempus imperdiet tortor ut mattis. Ut sed est eleifend, tristique diam non, blandit mi. Proin lorem enim, sollicitudin eget ornare sed, hendrerit non sapien. Integer quam neque, tristique in consectetur vel, luctus at ex. Sed libero justo, pellentesque nec maximus id, aliquam et odio. Pellentesque ac consequat nunc. Vestibulum quis diam vestibulum, faucibus mauris id, elementum mauris. Nunc hendrerit augue sed dui porttitor, vel elementum ex finibus. Vivamus sed porttitor sapien. Ut suscipit, erat quis dapibus feugiat, urna augue ultricies massa, vel sodales metus mi vitae metus. Sed mattis nibh eget massa commodo lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          
          Vivamus eu metus tortor. Duis lacinia, elit eget pretium consectetur, erat odio malesuada tellus, eget commodo tellus lectus egestas magna. Vestibulum pulvinar risus a ipsum dignissim pellentesque. Praesent varius dolor ut neque eleifend sodales. Nulla in sodales leo. Phasellus consequat blandit metus feugiat luctus. Etiam rutrum, ligula non vulputate congue, sem orci aliquam dolor, at ultricies odio ipsum in massa. Donec at sodales est. Mauris iaculis urna in cursus aliquet.`,
            // img: article_four_img,
            articleId: '34',
        },

        {
            date: new Date(+new Date() - Math.floor(Math.random() * 10000000000), ).toDateString(),
            heading: 'Long established',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis tincidunt felis, ac venenatis tortor. Duis interdum auctor tellus sed mollis. In hac habitasse platea dictumst. Aliquam scelerisque justo ac tortor fringilla condimentum. Nunc a sem vel diam viverra venenatis a vitae est. Maecenas at leo at diam aliquet sagittis. Vestibulum congue ultricies placerat.
      
          Vivamus consequat, velit sit amet ullamcorper pellentesque, mi ante tempus sapien, vehicula fermentum tellus massa eu diam. Morbi ante magna, iaculis ut blandit eu, imperdiet vitae nunc. Vestibulum tristique felis in purus euismod venenatis. Etiam hendrerit lacus eget turpis varius rutrum at vel metus. Morbi tempus imperdiet tortor ut mattis. Ut sed est eleifend, tristique diam non, blandit mi. Proin lorem enim, sollicitudin eget ornare sed, hendrerit non sapien. Integer quam neque, tristique in consectetur vel, luctus at ex. Sed libero justo, pellentesque nec maximus id, aliquam et odio. Pellentesque ac consequat nunc. Vestibulum quis diam vestibulum, faucibus mauris id, elementum mauris. Nunc hendrerit augue sed dui porttitor, vel elementum ex finibus. Vivamus sed porttitor sapien. Ut suscipit, erat quis dapibus feugiat, urna augue ultricies massa, vel sodales metus mi vitae metus. Sed mattis nibh eget massa commodo lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          
          Vivamus eu metus tortor. Duis lacinia, elit eget pretium consectetur, erat odio malesuada tellus, eget commodo tellus lectus egestas magna. Vestibulum pulvinar risus a ipsum dignissim pellentesque. Praesent varius dolor ut neque eleifend sodales. Nulla in sodales leo. Phasellus consequat blandit metus feugiat luctus. Etiam rutrum, ligula non vulputate congue, sem orci aliquam dolor, at ultricies odio ipsum in massa. Donec at sodales est. Mauris iaculis urna in cursus aliquet.`,
            // img: article_one_img,
            articleId: '96',
        },
        {
            date: new Date(+new Date() - Math.floor(Math.random() * 10000000000), ).toDateString(),
            heading: 'Long established',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis tincidunt felis, ac venenatis tortor. Duis interdum auctor tellus sed mollis. In hac habitasse platea dictumst. Aliquam scelerisque justo ac tortor fringilla condimentum. Nunc a sem vel diam viverra venenatis a vitae est. Maecenas at leo at diam aliquet sagittis. Vestibulum congue ultricies placerat.
      
          Vivamus consequat, velit sit amet ullamcorper pellentesque, mi ante tempus sapien, vehicula fermentum tellus massa eu diam. Morbi ante magna, iaculis ut blandit eu, imperdiet vitae nunc. Vestibulum tristique felis in purus euismod venenatis. Etiam hendrerit lacus eget turpis varius rutrum at vel metus. Morbi tempus imperdiet tortor ut mattis. Ut sed est eleifend, tristique diam non, blandit mi. Proin lorem enim, sollicitudin eget ornare sed, hendrerit non sapien. Integer quam neque, tristique in consectetur vel, luctus at ex. Sed libero justo, pellentesque nec maximus id, aliquam et odio. Pellentesque ac consequat nunc. Vestibulum quis diam vestibulum, faucibus mauris id, elementum mauris. Nunc hendrerit augue sed dui porttitor, vel elementum ex finibus. Vivamus sed porttitor sapien. Ut suscipit, erat quis dapibus feugiat, urna augue ultricies massa, vel sodales metus mi vitae metus. Sed mattis nibh eget massa commodo lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          
          Vivamus eu metus tortor. Duis lacinia, elit eget pretium consectetur, erat odio malesuada tellus, eget commodo tellus lectus egestas magna. Vestibulum pulvinar risus a ipsum dignissim pellentesque. Praesent varius dolor ut neque eleifend sodales. Nulla in sodales leo. Phasellus consequat blandit metus feugiat luctus. Etiam rutrum, ligula non vulputate congue, sem orci aliquam dolor, at ultricies odio ipsum in massa. Donec at sodales est. Mauris iaculis urna in cursus aliquet.`,
            // img: article_one_img,
            articleId: '43',
        },
        {
            date: new Date(+new Date() - Math.floor(Math.random() * 10000000000), ).toDateString(),
            heading: 'Long established',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis tincidunt felis, ac venenatis tortor. Duis interdum auctor tellus sed mollis. In hac habitasse platea dictumst. Aliquam scelerisque justo ac tortor fringilla condimentum. Nunc a sem vel diam viverra venenatis a vitae est. Maecenas at leo at diam aliquet sagittis. Vestibulum congue ultricies placerat.
      
          Vivamus consequat, velit sit amet ullamcorper pellentesque, mi ante tempus sapien, vehicula fermentum tellus massa eu diam. Morbi ante magna, iaculis ut blandit eu, imperdiet vitae nunc. Vestibulum tristique felis in purus euismod venenatis. Etiam hendrerit lacus eget turpis varius rutrum at vel metus. Morbi tempus imperdiet tortor ut mattis. Ut sed est eleifend, tristique diam non, blandit mi. Proin lorem enim, sollicitudin eget ornare sed, hendrerit non sapien. Integer quam neque, tristique in consectetur vel, luctus at ex. Sed libero justo, pellentesque nec maximus id, aliquam et odio. Pellentesque ac consequat nunc. Vestibulum quis diam vestibulum, faucibus mauris id, elementum mauris. Nunc hendrerit augue sed dui porttitor, vel elementum ex finibus. Vivamus sed porttitor sapien. Ut suscipit, erat quis dapibus feugiat, urna augue ultricies massa, vel sodales metus mi vitae metus. Sed mattis nibh eget massa commodo lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          
          Vivamus eu metus tortor. Duis lacinia, elit eget pretium consectetur, erat odio malesuada tellus, eget commodo tellus lectus egestas magna. Vestibulum pulvinar risus a ipsum dignissim pellentesque. Praesent varius dolor ut neque eleifend sodales. Nulla in sodales leo. Phasellus consequat blandit metus feugiat luctus. Etiam rutrum, ligula non vulputate congue, sem orci aliquam dolor, at ultricies odio ipsum in massa. Donec at sodales est. Mauris iaculis urna in cursus aliquet.`,
            // img: article_three_img,
            articleId: '2367',
        },
        {
            date: new Date(+new Date() - Math.floor(Math.random() * 10000000000), ).toDateString(),
            heading: 'Long established',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis tincidunt felis, ac venenatis tortor. Duis interdum auctor tellus sed mollis. In hac habitasse platea dictumst. Aliquam scelerisque justo ac tortor fringilla condimentum. Nunc a sem vel diam viverra venenatis a vitae est. Maecenas at leo at diam aliquet sagittis. Vestibulum congue ultricies placerat.
      
          Vivamus consequat, velit sit amet ullamcorper pellentesque, mi ante tempus sapien, vehicula fermentum tellus massa eu diam. Morbi ante magna, iaculis ut blandit eu, imperdiet vitae nunc. Vestibulum tristique felis in purus euismod venenatis. Etiam hendrerit lacus eget turpis varius rutrum at vel metus. Morbi tempus imperdiet tortor ut mattis. Ut sed est eleifend, tristique diam non, blandit mi. Proin lorem enim, sollicitudin eget ornare sed, hendrerit non sapien. Integer quam neque, tristique in consectetur vel, luctus at ex. Sed libero justo, pellentesque nec maximus id, aliquam et odio. Pellentesque ac consequat nunc. Vestibulum quis diam vestibulum, faucibus mauris id, elementum mauris. Nunc hendrerit augue sed dui porttitor, vel elementum ex finibus. Vivamus sed porttitor sapien. Ut suscipit, erat quis dapibus feugiat, urna augue ultricies massa, vel sodales metus mi vitae metus. Sed mattis nibh eget massa commodo lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          
          Vivamus eu metus tortor. Duis lacinia, elit eget pretium consectetur, erat odio malesuada tellus, eget commodo tellus lectus egestas magna. Vestibulum pulvinar risus a ipsum dignissim pellentesque. Praesent varius dolor ut neque eleifend sodales. Nulla in sodales leo. Phasellus consequat blandit metus feugiat luctus. Etiam rutrum, ligula non vulputate congue, sem orci aliquam dolor, at ultricies odio ipsum in massa. Donec at sodales est. Mauris iaculis urna in cursus aliquet.`,
            // img: article_four_img,
            articleId: '4301',
        },

        {
            date: new Date(+new Date() - Math.floor(Math.random() * 10000000000), ).toDateString(),
            heading: 'Long established',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis tincidunt felis, ac venenatis tortor. Duis interdum auctor tellus sed mollis. In hac habitasse platea dictumst. Aliquam scelerisque justo ac tortor fringilla condimentum. Nunc a sem vel diam viverra venenatis a vitae est. Maecenas at leo at diam aliquet sagittis. Vestibulum congue ultricies placerat.
      
          Vivamus consequat, velit sit amet ullamcorper pellentesque, mi ante tempus sapien, vehicula fermentum tellus massa eu diam. Morbi ante magna, iaculis ut blandit eu, imperdiet vitae nunc. Vestibulum tristique felis in purus euismod venenatis. Etiam hendrerit lacus eget turpis varius rutrum at vel metus. Morbi tempus imperdiet tortor ut mattis. Ut sed est eleifend, tristique diam non, blandit mi. Proin lorem enim, sollicitudin eget ornare sed, hendrerit non sapien. Integer quam neque, tristique in consectetur vel, luctus at ex. Sed libero justo, pellentesque nec maximus id, aliquam et odio. Pellentesque ac consequat nunc. Vestibulum quis diam vestibulum, faucibus mauris id, elementum mauris. Nunc hendrerit augue sed dui porttitor, vel elementum ex finibus. Vivamus sed porttitor sapien. Ut suscipit, erat quis dapibus feugiat, urna augue ultricies massa, vel sodales metus mi vitae metus. Sed mattis nibh eget massa commodo lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          
          Vivamus eu metus tortor. Duis lacinia, elit eget pretium consectetur, erat odio malesuada tellus, eget commodo tellus lectus egestas magna. Vestibulum pulvinar risus a ipsum dignissim pellentesque. Praesent varius dolor ut neque eleifend sodales. Nulla in sodales leo. Phasellus consequat blandit metus feugiat luctus. Etiam rutrum, ligula non vulputate congue, sem orci aliquam dolor, at ultricies odio ipsum in massa. Donec at sodales est. Mauris iaculis urna in cursus aliquet.`,
            // img: article_one_img,
            articleId: '4312',
        },
        {
            date: new Date(+new Date() - Math.floor(Math.random() * 10000000000), ).toDateString(),
            heading: 'Long established',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis tincidunt felis, ac venenatis tortor. Duis interdum auctor tellus sed mollis. In hac habitasse platea dictumst. Aliquam scelerisque justo ac tortor fringilla condimentum. Nunc a sem vel diam viverra venenatis a vitae est. Maecenas at leo at diam aliquet sagittis. Vestibulum congue ultricies placerat.
      
          Vivamus consequat, velit sit amet ullamcorper pellentesque, mi ante tempus sapien, vehicula fermentum tellus massa eu diam. Morbi ante magna, iaculis ut blandit eu, imperdiet vitae nunc. Vestibulum tristique felis in purus euismod venenatis. Etiam hendrerit lacus eget turpis varius rutrum at vel metus. Morbi tempus imperdiet tortor ut mattis. Ut sed est eleifend, tristique diam non, blandit mi. Proin lorem enim, sollicitudin eget ornare sed, hendrerit non sapien. Integer quam neque, tristique in consectetur vel, luctus at ex. Sed libero justo, pellentesque nec maximus id, aliquam et odio. Pellentesque ac consequat nunc. Vestibulum quis diam vestibulum, faucibus mauris id, elementum mauris. Nunc hendrerit augue sed dui porttitor, vel elementum ex finibus. Vivamus sed porttitor sapien. Ut suscipit, erat quis dapibus feugiat, urna augue ultricies massa, vel sodales metus mi vitae metus. Sed mattis nibh eget massa commodo lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          
          Vivamus eu metus tortor. Duis lacinia, elit eget pretium consectetur, erat odio malesuada tellus, eget commodo tellus lectus egestas magna. Vestibulum pulvinar risus a ipsum dignissim pellentesque. Praesent varius dolor ut neque eleifend sodales. Nulla in sodales leo. Phasellus consequat blandit metus feugiat luctus. Etiam rutrum, ligula non vulputate congue, sem orci aliquam dolor, at ultricies odio ipsum in massa. Donec at sodales est. Mauris iaculis urna in cursus aliquet.`,
            // img: article_one_img,
            articleId: '4651',
        },
        {
            date: new Date(+new Date() - Math.floor(Math.random() * 10000000000), ).toDateString(),
            heading: 'Long established',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis tincidunt felis, ac venenatis tortor. Duis interdum auctor tellus sed mollis. In hac habitasse platea dictumst. Aliquam scelerisque justo ac tortor fringilla condimentum. Nunc a sem vel diam viverra venenatis a vitae est. Maecenas at leo at diam aliquet sagittis. Vestibulum congue ultricies placerat.
      
          Vivamus consequat, velit sit amet ullamcorper pellentesque, mi ante tempus sapien, vehicula fermentum tellus massa eu diam. Morbi ante magna, iaculis ut blandit eu, imperdiet vitae nunc. Vestibulum tristique felis in purus euismod venenatis. Etiam hendrerit lacus eget turpis varius rutrum at vel metus. Morbi tempus imperdiet tortor ut mattis. Ut sed est eleifend, tristique diam non, blandit mi. Proin lorem enim, sollicitudin eget ornare sed, hendrerit non sapien. Integer quam neque, tristique in consectetur vel, luctus at ex. Sed libero justo, pellentesque nec maximus id, aliquam et odio. Pellentesque ac consequat nunc. Vestibulum quis diam vestibulum, faucibus mauris id, elementum mauris. Nunc hendrerit augue sed dui porttitor, vel elementum ex finibus. Vivamus sed porttitor sapien. Ut suscipit, erat quis dapibus feugiat, urna augue ultricies massa, vel sodales metus mi vitae metus. Sed mattis nibh eget massa commodo lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          
          Vivamus eu metus tortor. Duis lacinia, elit eget pretium consectetur, erat odio malesuada tellus, eget commodo tellus lectus egestas magna. Vestibulum pulvinar risus a ipsum dignissim pellentesque. Praesent varius dolor ut neque eleifend sodales. Nulla in sodales leo. Phasellus consequat blandit metus feugiat luctus. Etiam rutrum, ligula non vulputate congue, sem orci aliquam dolor, at ultricies odio ipsum in massa. Donec at sodales est. Mauris iaculis urna in cursus aliquet.`,
            // img: article_three_img,
            articleId: '82061',
        },
        {
            date: new Date(+new Date() - Math.floor(Math.random() * 10000000000), ).toDateString(),
            heading: 'Long established last',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis tincidunt felis, ac venenatis tortor. Duis interdum auctor tellus sed mollis. In hac habitasse platea dictumst. Aliquam scelerisque justo ac tortor fringilla condimentum. Nunc a sem vel diam viverra venenatis a vitae est. Maecenas at leo at diam aliquet sagittis. Vestibulum congue ultricies placerat.
      
          Vivamus consequat, velit sit amet ullamcorper pellentesque, mi ante tempus sapien, vehicula fermentum tellus massa eu diam. Morbi ante magna, iaculis ut blandit eu, imperdiet vitae nunc. Vestibulum tristique felis in purus euismod venenatis. Etiam hendrerit lacus eget turpis varius rutrum at vel metus. Morbi tempus imperdiet tortor ut mattis. Ut sed est eleifend, tristique diam non, blandit mi. Proin lorem enim, sollicitudin eget ornare sed, hendrerit non sapien. Integer quam neque, tristique in consectetur vel, luctus at ex. Sed libero justo, pellentesque nec maximus id, aliquam et odio. Pellentesque ac consequat nunc. Vestibulum quis diam vestibulum, faucibus mauris id, elementum mauris. Nunc hendrerit augue sed dui porttitor, vel elementum ex finibus. Vivamus sed porttitor sapien. Ut suscipit, erat quis dapibus feugiat, urna augue ultricies massa, vel sodales metus mi vitae metus. Sed mattis nibh eget massa commodo lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          
          Vivamus eu metus tortor. Duis lacinia, elit eget pretium consectetur, erat odio malesuada tellus, eget commodo tellus lectus egestas magna. Vestibulum pulvinar risus a ipsum dignissim pellentesque. Praesent varius dolor ut neque eleifend sodales. Nulla in sodales leo. Phasellus consequat blandit metus feugiat luctus. Etiam rutrum, ligula non vulputate congue, sem orci aliquam dolor, at ultricies odio ipsum in massa. Donec at sodales est. Mauris iaculis urna in cursus aliquet.`,
            // img: last,
            articleId: '472332',
        },
    ],
})

export const getters = {
    languages: state => {
        return state.languages;
    },
    themes: state => {
        return state.themes;
    },
    news: state => {
        return state.news;
    }
}

export const actions = {

}

export const mutations = {

}