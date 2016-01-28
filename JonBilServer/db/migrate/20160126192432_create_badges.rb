class CreateBadges < ActiveRecord::Migration
  def change
    create_table :badges do |t|
      t.string :phrase
      t.integer :victim_id
      t.integer :vote_count

      t.timestamps null: false
    end
  end
end
