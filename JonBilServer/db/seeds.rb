# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'faker'

people = %w{Anne, Derek, Hunter, Jen, Julian, Sara, Shambhavi, Walker, Stu}

people.each do |person|
  new_person = Person.create!(name: person)
  7.times do
    new_badge = Badge.create!(
    victim_id: new_person.id,
    phrase: Faker::Company.catch_phrase)
  end
end


