class CreatePalettes < ActiveRecord::Migration[6.1]
  def change
    create_table :palettes do |t|
      enable_extension 'hstore'
      t.hstore :palette, default: [], array: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
