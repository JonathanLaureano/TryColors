class PaletteSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :palette
  has_one :user
end
