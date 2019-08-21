class CreateScripts < ActiveRecord::Migration[5.2]
  def change
    create_table :scripts do |t|
      t.string :title
      t.string :content
      t.integer :speaker_id

      t.timestamps
    end
  end
end
