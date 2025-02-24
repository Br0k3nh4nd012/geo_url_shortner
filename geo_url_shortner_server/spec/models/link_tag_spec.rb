require 'rails_helper'

RSpec.describe LinkTag, type: :model do
  describe 'validations' do
    it 'validates presence of original_url' do
      link_tag = LinkTag.new(tag: 'exampletag')
      expect(link_tag).not_to be_valid
      expect(link_tag.errors[:original_url]).to include("can't be blank")
    end

    it 'validates presence of tag' do
      link_tag = LinkTag.new(original_url: 'http://example.com')
      allow(link_tag).to receive(:populate_tag)
      expect(link_tag).not_to be_valid
      expect(link_tag.errors[:tag]).to include("can't be blank")
    end

    it 'validates uniqueness of tag' do
      LinkTag.create!(original_url: 'http://example.com', tag: 'unique_tag')
      duplicate_tag = LinkTag.new(original_url: 'http://example2.com', tag: 'unique_tag')
      expect(duplicate_tag).not_to be_valid
      expect(duplicate_tag.errors[:tag]).to include("has already been taken")
    end
  end

  describe 'callbacks' do
    it 'populates tag before validation' do
      link_tag = LinkTag.new(original_url: 'http://example.com')
      expect(link_tag).to be_valid
      expect(link_tag.tag).to be_present
    end
  end
end