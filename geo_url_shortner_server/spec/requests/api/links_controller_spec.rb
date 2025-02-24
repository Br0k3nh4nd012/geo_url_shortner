require 'rails_helper'

RSpec.describe Api::LinksController, type: :request do
  describe "POST /api/links/get_short_link" do
    let(:valid_params) { { link: { url: "https://example.com" } } }
    let(:invalid_params) { { link: { url: "" } } }

    it "creates a short link with valid params" do
      post "/api/get_short_link", params: valid_params
      expect(response).to have_http_status(:created)
      expect(JSON.parse(response.body)["success"]).to be true
    end

    it "returns an error with invalid params" do
      post "/api/get_short_link", params: invalid_params
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)["success"]).to be false
    end
  end

  describe "GET /api/links/url_list" do
    let!(:link_tag) { LinkTag.create(original_url: "https://example.com", tag: "testtag") }

    it "returns a list of all links" do
      get "/api/url_list"
      expect(response).to have_http_status(:ok)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response).to be_an_instance_of(Array)
      expect(parsed_response[0]['id']).to eq(link_tag.id)
    end
  end

  describe "GET /:tag" do
    let!(:link_tag) { LinkTag.create(original_url: "https://example.com", tag: "testtag") }

    it "redirects to the original URL if tag exists" do
      get "/#{link_tag.tag}"
      expect(response).to redirect_to(link_tag.original_url)
    end

    it "redirects to 404 page if tag does not exist" do
      get "/nonexistenttag"
      expect(response).to redirect_to("/404.html")
    end
  end
end