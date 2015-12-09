#!/bin/env ruby
# encoding: utf-8

require 'net/http'
require 'uri'
require 'json'

# TODO replace with a real production host
server = "http://shane.gg/api/"

SCHEDULER.every '30s', :first_in => 0 do |job|

  url = URI.parse("#{server}pokemon/singlerider")
  http = Net::HTTP.new(url.host, url.port)
  response = http.request(Net::HTTP::Get.new(url.request_uri))

  # Convert to JSON
  j = JSON.parse(response.body)

  # Send the joke to the text widget
#  send_event("pokemon", { items: pokemon.values })


  # Sending to List widget, so map to :label and :value
  acctitems = j["party"].map do |row|
    row = {
      :label => row["nickname"],
      :value => row["level"]
    }
  end

  # Update the List widget
  send_event('pokemon', { items: acctitems } )

end
