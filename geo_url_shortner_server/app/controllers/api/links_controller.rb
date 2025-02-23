class Api::LinksController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def get_short_link
    original_url = params.dig(:link, :url)

    link_tag = LinkTag.create(original_url:)
    puts link_tag.errors.full_messages
    if link_tag.persisted?
      render json: { success: true, tag: link_tag.tag, id: link_tag.id }, status: :created
    else
    render json: { success: false, error: "Unable to create short link" }, status: :unprocessable_entity
    end
  end

  def url_list
    render json: LinkTag.all.order(created_at: :desc).to_json
  end

  def redirect_link
    link_tag = LinkTag.find_by(tag: params[:tag])
    if link_tag
      decoded_url = URI.decode_uri_component(link_tag.original_url)
      puts "redirecting to #{decoded_url}"
      redirect_to decoded_url , allow_other_host: true
    else
      redirect_to "/404.html"
    end
  end
end
