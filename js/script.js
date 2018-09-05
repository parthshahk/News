
            document.addEventListener('DOMContentLoaded', function() {

                app.fetch();
            });

            var data = {

                loading: true,

                results: '',
                topResultsCount: 0,

                country: '',
                category: '',
                query: ''
            };

            var methods = {

                fetchTop : function(country,category,query){

                    if(query == ''){
                    
                        axios
                        .get('https://newsapi.org/v2/top-headlines?apiKey=7324b5953e3b40f4bd657d54d29fb746&country='+country+'&category='+category)
                        .then(response => {
                            this.results = response.data.articles
                            this.topResultsCount = response.data.totalResults
                            this.loading = false
                        })

                    }else{

                        axios
                        .get('https://newsapi.org/v2/top-headlines?apiKey=7324b5953e3b40f4bd657d54d29fb746&q='+query+'&pageSize=40')
                        .then(response => {
                            this.results = response.data.articles
                            this.topResultsCount = response.data.totalResults
                            this.loading = false
                            this.query = ''
                        })
                    }                    
                },

                fetch : function(){
                    this.results = '';
                    this.topResultsCount = 0;
                    this.loading = true;

                    if(this.country == ''){
                        this.country = 'in';                // Default Country - India
                    }

                    if(this.category == ''){
                        this.category = 'general';            // Default Category - General
                    }

                    if(this.query != ''){
                        this.country = '';
                        this.category = '';
                    }

                    this.fetchTop(this.country,this.category,this.query);
                },

                computeDate : function(d){
                    var date = new Date(d);
                    return date.toUTCString();
                }
            };

            var app = new Vue({
                el: '#app',
                data: data,
                methods: methods
            });
