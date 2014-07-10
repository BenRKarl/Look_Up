class CreateAstronomies < ActiveRecord::Migration
  def change
    create_table :astronomies do |t|

      t.timestamps
    end
  end
end
