class AddSubjectToVideo < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :subject_id, :integer
    add_index  :videos, :subject_id
  end
  def down
    remove_index :videos, :subject_id
    remove_column :videos, :subject_id
  end
end
