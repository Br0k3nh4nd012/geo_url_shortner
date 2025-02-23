class CreateLinkTags < ActiveRecord::Migration[8.0]
  def change
    create_table :link_tags do |t|
      t.string :original_url
      t.string :tag

      t.timestamps
    end
  end
end
