Rails.application.routes.draw do
  resources :palettes
  resources :users

  get "/palettes", to: "users#user_palettes"
  get "/me", to: "users#show"

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"

  delete "/logout", to: "sessions#destroy"
end
