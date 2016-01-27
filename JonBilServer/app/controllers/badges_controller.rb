class BadgesController < ApplicationController
  before_action :set_badge, only: [:show, :update, :destroy]
  before_action :set_person, only: [:show, :update, :destroy]

  # GET /badges
  # GET /badges.json
  def index
    @badges = @person.prizes
    render json: @badges
  end

  # GET /badges/1
  # GET /badges/1.json
  # def show
  #   render json: @badge
  # end

  # POST /badges
  # POST /badges.json
  def create
    @badge = Badge.new(badge_params)

    if @badge.save
      render json: @badge, status: :created, location: @badge
    else
      render json: @badge.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /badges/1
  # PATCH/PUT /badges/1.json
  def update
    if vote_record
      render json: @badge.vote_count
    else
      render json: @vote.errors, status: :unprocessable_entity
    end
  end

  # DELETE /badges/1
  # DELETE /badges/1.json
  # def destroy
  #   @badge.destroy

  #   head :no_content
  # end

  private

    def set_badge
      @badge = Badge.find(params[:id])
    end

    def set_person
      @person = Person.find(params[:id])
    end

    def badge_params
      params[:badge]  # {person_id: '123', badge_id: '123'[, phrase: 'lalala'][, vote_value: '1']}
    end

    def record_vote
      @vote = Vote.new(badge_params)
      if @vote.save
        return true
      else
        @vote = @badge.votes.find_by_person_id(@person.id)
        return true if @vote.update(vote_value: badge_params[:vote_value])
      end
      return false
    end
end
