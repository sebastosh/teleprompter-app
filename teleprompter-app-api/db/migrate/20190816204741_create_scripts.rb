class CreateScripts < ActiveRecord::Migration[5.2]
  def change
    create_table :scripts do |t|
      t.string :title
      t.string :content
      t.references :speaker, foreign_key: true

      t.timestamps
    end
  end
end
