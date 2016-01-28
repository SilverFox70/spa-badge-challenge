class BadgesController < ApplicationController
  before_action :set_person, only: [:index, :show, :update, :destroy]
  before_action :set_badge, only: [:show, :update, :destroy]

  # GET /badges
  # GET /badges.json
  def index
    p "*" * 40
    p "params in index method: #{params[:person_id]}"
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
    p "*" * 40
    p "params at update: #{params.inspect}"
    if record_vote(params)
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
      @person = Person.find(params[:person_id])
    end

    def badge_params
      params[:badge]  # {person_id: '123', badge_id: '123'[, phrase: 'lalala'][, vote_value: '1']}
    end

    def record_vote(p)
      p "*" * 40
      p "in record vote method"
      @vote = Vote.new(person_id: p[:person_id], badge_id: p[:id], vote_value: p[:voteDir])
      if @vote.save
        update_vote_count
        return true
      else
        @vote = @badge.votes.find_by_person_id(@person.id)
        return true if @vote.update(vote_value: p[:voteDir])
      end
      return false
    end
end
