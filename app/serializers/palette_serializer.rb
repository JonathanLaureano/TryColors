class PaletteSerializer < ActiveModel::Serializer
  attributes :id, :palette
  has_one :user
end
