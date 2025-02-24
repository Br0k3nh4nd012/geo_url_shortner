class LinkTag < ApplicationRecord
  ## VALIDATIONS ##
  validates :tag, uniqueness: true
  validates :original_url, :tag, presence: true

  ## CALLBACKS ##
  before_validation :populate_tag, unless: -> { tag.present? }


  def populate_tag
    timestamp = Time.now.to_f.to_s
    random_str = SecureRandom.hex(4)
    base = Digest::SHA256.hexdigest("#{timestamp}#{random_str}")

    self.tag = base[0...8].gsub(/[^0-9A-Za-z]/, "0")
    end  
end