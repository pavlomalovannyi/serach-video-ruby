Rails.application.routes.draw do
  resources :articles
  root to: 'search#index'
  post 'search', to: 'search#search'
end